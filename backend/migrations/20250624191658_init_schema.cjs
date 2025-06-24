exports.up = async function (knex) {
    await knex.schema.createTable('locations', (table) => {
        table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
        table.string('name').notNullable();
        table.enu('type', ['district', 'taluka', 'city', 'zone', 'ward', 'village']).notNullable();
        table.uuid('parent_id').references('id').inTable('locations').onDelete('SET NULL');
        table.string('code').unique();
        table.decimal('latitude', 10, 6);
        table.decimal('longitude', 10, 6);
        table.specificType('area_polygon', 'geometry');
        table.timestamps(true, true);
    });

    await knex.schema.createTable('departments', (table) => {
        table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
        table.string('name').notNullable();
        table.uuid('location_id').references('id').inTable('locations').onDelete('CASCADE');
        table.timestamps(true, true);
    });

    await knex.schema.createTable('officers', (table) => {
        table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
        table.uuid('department_id').references('id').inTable('departments').onDelete('CASCADE');
        table.string('name');
        table.string('designation');
        table.string('phone');
        table.string('email');
        table.integer('escalation_level').defaultTo(3);
        table.timestamps(true, true);
    });

    await knex.schema.createTable('location_aliases', (table) => {
        table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
        table.string('alias');
        table.uuid('location_id').references('id').inTable('locations').onDelete('CASCADE');
        table.timestamps(true, true);
    });

    await knex.schema.createTable('complaints', (table) => {
        table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
        table.string('user_id');
        table.enu('issue_type', ['road', 'water', 'electricity', 'garbage', 'other']).notNullable();
        table.decimal('latitude', 10, 6);
        table.decimal('longitude', 10, 6);
        table.uuid('resolved_location_id').references('id').inTable('locations').onDelete('SET NULL');
        table.timestamp('created_at').defaultTo(knex.fn.now());
    });
};

exports.down = async function (knex) {
    await knex.schema.dropTableIfExists('complaints');
    await knex.schema.dropTableIfExists('location_aliases');
    await knex.schema.dropTableIfExists('officers');
    await knex.schema.dropTableIfExists('departments');
    await knex.schema.dropTableIfExists('locations');
};
