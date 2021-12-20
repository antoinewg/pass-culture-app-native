import flatten from 'lodash.flatten'

import { VenueTypeCodeKey } from 'api/gen'
import { VenuesSearchParametersFields } from 'features/home/contentful'
import { LocationType } from 'features/search/enums'
import { AlgoliaVenue, FiltersArray } from 'libs/algolia'
import { VenuesFacets } from 'libs/algolia/enums'
import { client } from 'libs/algolia/fetchAlgolia/clients'
import { buildGeolocationParameter } from 'libs/algolia/fetchAlgolia/fetchAlgolia'
import { buildHitsPerPage } from 'libs/algolia/fetchAlgolia/utils'
import { env } from 'libs/environment'
import { GeoCoordinates } from 'libs/geolocation'
import { VenueHit } from 'libs/search'
import { parseGeolocationParameters } from 'libs/search/parseSearchParameters'
import { getVenueTypeFacetFilters } from 'libs/search/utils/getVenueTypeFacetFilters'
import { captureAlgoliaError } from 'libs/algolia/fetchAlgolia/AlgoliaError'

const attributesToHighlight: string[] = [] // We disable highlighting because we don't need it

// Used for the venue playlists on the homepage
export const fetchMultipleVenues = async (
  paramsList: VenuesSearchParametersFields[],
  userLocation: GeoCoordinates | null
): Promise<VenueHit[]> => {
  const queries = paramsList.map((params) => ({
    indexName: env.ALGOLIA_VENUES_INDEX_NAME,
    query: '',
    params: {
      ...buildVenuesQueryOptions(params, userLocation),
      ...buildHitsPerPage(params.hitsPerPage),
      attributesToHighlight,
    },
  }))

  try {
    const allResults = await client.multipleQueries<AlgoliaVenue>(queries)
    const hits = flatten(allResults.results.map(({ hits }) => hits))
    return hits.map(buildVenueHit)
  } catch (error) {
    captureAlgoliaError(error)
    return [] as VenueHit[]
  }
}

const buildVenuesQueryOptions = (
  params: VenuesSearchParametersFields,
  userLocation: GeoCoordinates | null
) => {
  const { aroundRadius, isGeolocated, venueTypes = [] } = params

  const locationFilter = parseGeolocationParameters(userLocation, isGeolocated, aroundRadius) || {
    locationType: LocationType.EVERYWHERE,
  }

  const facetFilters: FiltersArray = []

  if (venueTypes.length) {
    const venueTypesPredicate = buildVenueTypesPredicate(venueTypes.map(getVenueTypeFacetFilters))
    facetFilters.push(venueTypesPredicate)
  }

  return {
    ...buildGeolocationParameter(locationFilter, userLocation),
    ...(facetFilters.length > 0 ? { facetFilters } : {}),
  }
}

const buildVenueTypesPredicate = (venueTypes: string[]): string[] =>
  venueTypes.map((venueType) => `${VenuesFacets.venue_type}:${venueType}`)

const buildVenueHit = (venue: AlgoliaVenue): VenueHit => {
  const socialMedias: Record<string, string> = {}
  if (venue.facebook) socialMedias[venue.facebook] = venue.facebook
  if (venue.instagram) socialMedias[venue.instagram] = venue.instagram
  if (venue.twitter) socialMedias[venue.twitter] = venue.twitter
  if (venue.snapchat) socialMedias[venue.snapchat] = venue.snapchat

  return {
    accessibility: {
      audioDisability: venue.audio_disability,
      mentalDisability: venue.mental_disability,
      motorDisability: venue.motor_disability,
      visualDisability: venue.visual_disability,
    },
    contact: {
      email: venue.email || undefined,
      phoneNumber: venue.phone_number || undefined,
      website: venue.website || undefined,
      socialMedias,
    },
    description: venue.description,
    id: parseInt(venue.objectID),
    latitude: venue._geoloc.lat,
    longitude: venue._geoloc.lng,
    name: venue.name,
    publicName: venue.name,
    venueTypeCode: venue.venue_type as VenueTypeCodeKey,
  }
}
