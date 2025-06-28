import db from '../db.config.js';

export async function findNearestWard(lat, lng, radiusKm = 5) {
    const degreeBuffer = radiusKm / 111.0; // ~1 deg = 111 km

    const [ward] = await db('locations')
        .where('type', 'ward')
        .andWhereRaw(
            'point(longitude, latitude) <@ circle(point(?, ?), ?)',
            [lng, lat, degreeBuffer]
        )
        .orderByRaw('point(longitude, latitude) <-> point(?, ?)', [lng, lat])
        .limit(1);

    return ward;
}

export async function getAliasesByLocationId(locationId) {
    const aliases = await db('location_aliases')
        .where({ location_id: locationId })
        .pluck('alias');
    return aliases;
}
