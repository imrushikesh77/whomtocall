import db from '../db.config.js';

export async function getOfficersByDepartment(departmentId) {
    return db('officers')
        .where({ department_id: departmentId })
        .orderBy('escalation_level');
}
