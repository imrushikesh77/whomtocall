const fs = require('fs');
const path = require('path');

exports.seed = async function (knex) {
  const filePath = path.join(__dirname, '../data/pune_road_data.json');
  const raw = fs.readFileSync(filePath);
  const entries = JSON.parse(raw);

  const locationCache = {};
  const zoneCache = {};

  for (const entry of entries) {
    const { location, department, officers } = entry;

    // 1. Handle parent (zone)
    let parent_id = null;
    if (location.parent) {
      if (!zoneCache[location.parent]) {
        const [zone] = await knex('locations')
          .insert({
            name: location.parent,
            type: 'zone',
            code: `ZONE_${location.parent.replace(/\s+/g, '_')}`,
            latitude: null,
            longitude: null,
            created_at: new Date(),
            updated_at: new Date()
          })
          .returning('*');
        zoneCache[location.parent] = zone.id;
      }
      parent_id = zoneCache[location.parent];
    }

    // 2. Insert ward location
    const [loc] = await knex('locations')
      .insert({
        name: location.name,
        type: location.type,
        code: location.code,
        parent_id,
        latitude: location.latitude,
        longitude: location.longitude,
        created_at: new Date(),
        updated_at: new Date()
      })
      .returning('*');

    locationCache[location.code] = loc.id;

    // 3. Insert aliases
    if (location.localities && Array.isArray(location.localities)) {
      for (const alias of location.localities) {
        await knex('location_aliases').insert({
          alias,
          location_id: loc.id,
          created_at: new Date(),
          updated_at: new Date()
        });
      }
    }

    // 4. Insert department
    const [dept] = await knex('departments')
      .insert({
        name: department.name,
        location_id: loc.id,
        created_at: new Date(),
        updated_at: new Date()
      })
      .returning('*');

    // 5. Insert officers
    for (const officer of officers) {
      await knex('officers').insert({
        department_id: dept.id,
        name: officer.name,
        designation: officer.designation,
        phone: officer.mob === 'null' ? null : officer.mob,
        email: officer.email === 'null' ? null : officer.email,
        escalation_level: officer.escalation_level,
        created_at: new Date(),
        updated_at: new Date()
      });
    }
  }
};
