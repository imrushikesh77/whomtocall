import { findNearestWard, getAliasesByLocationId } from "../db/queries/locations.query.js";
import { getDepartmentByLocationAndIssue } from "../db/queries/departments.query.js";
import { getOfficersByDepartment } from "../db/queries/officers.query.js";


const handleWebUserRequest = async (req, res) => {
    try {
        const {
            issueType,
            lat,
            long
        } = req.body;
        if (!issueType || !lat || !long) {
            return res.status(400).json({ error: 'Missing required fields' });
        }
        // console.log('Received request:', { issueType, lat, long });
        const location = await findNearestWard(lat, long);
        // console.log('Nearest location found:', location);
        const aliases = await getAliasesByLocationId(location.id);
        // console.log('Aliases for location:', aliases);
        const department = await getDepartmentByLocationAndIssue(location.id, issueType);
        // console.log('Department found:', department);
        const officers = await getOfficersByDepartment(department.id);
        // console.log('Officers found:', officers);
        return res.json({
            message: "Sad to hear about your problem.",
            responsible_dept: department.name,
            location: {
                name: location.name,
                code: location.code,
                type: location.type
            },
            nearby_localities: aliases,
            authorities: officers.map(o => ({
                name: o.name,
                designation: o.designation,
                mob: o.phone || 'N/A',
                email: o.email || 'N/A',
                escalation_level: o.escalation_level,
                last_updated_at: o.updated_at
            }))
        });
    } catch (error) {
        console.error('Error processing request:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

export {
    handleWebUserRequest
}