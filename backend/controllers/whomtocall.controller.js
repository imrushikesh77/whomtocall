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

        const supportedTypes = ['road', 'water', 'electricity', 'garbage', 'other'];
        if (!supportedTypes.includes(issueType.toLowerCase())) {
            return res.status(400).json({ error: 'Unsupported issue type' });
        }

        // console.log('Received request:', { issueType, lat, long });
        const location = await findNearestWard(lat, long);

        if (!location) {
            return res.status(404).json({
                error: 'We could not pinpoint your location within 10km radius. Try again later.',
            });
        }

        // console.log('Nearest location found:', location);
        const aliases = await getAliasesByLocationId(location.id);
        // console.log('Aliases for location:', aliases);
        const department = await getDepartmentByLocationAndIssue(location.id, issueType);

        if (!department) {
            return res.status(404).json({
                error: 'No department found for this issue in your location.',
            });
        }

        // console.log('Department found:', department);
        const officers = await getOfficersByDepartment(department.id);
        // console.log('Officers found:', officers);
        return res.json({
            message: "Sad to hear about your problem.",
            responsibleDept: department.name,
            location: {
                name: location.name,
                code: location.code,
                type: location.type
            },
            nearbyLocalities: aliases,
            authorities: officers.map(o => ({
                name: o.name,
                designation: o.designation,
                mobile: o.phone || 'N/A',
                email: o.email || 'N/A',
                escalationLevel: o.escalation_level,
                lastUpdated: new Date(o.updated_at).toLocaleString()
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