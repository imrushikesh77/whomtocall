import db from '../db.config.js';

export async function findNearestWard(lat, lng, radiusKm = 10) {
    const degreeBuffer = radiusKm / 111.0; // approx 1° ≈ 111 km

    const result = await db('locations')
        .where('type', 'ward')
        .andWhereRaw(
            'point(longitude, latitude) <@ circle(point(?, ?), ?)',
            [lng, lat, degreeBuffer]
        )
        .orderByRaw('point(longitude, latitude) <-> point(?, ?)', [lng, lat])
        .limit(1);

    // Return null if no nearby ward found
    if (!result || result.length === 0) {
        return null;
    }

    return result[0];
}


export async function getAliasesByLocationId(locationId) {
    const aliases = await db('location_aliases')
        .where({ location_id: locationId })
        .pluck('alias');
    return aliases;
}
