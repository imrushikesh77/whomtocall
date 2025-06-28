import db from '../db.config.js';

export async function getDepartmentByLocationAndIssue(locationId, issue) {
    return db('departments')
        .where({
            location_id: locationId,
        })
        .andWhereRaw('name ILIKE ?', [issue])
        .first();
}
