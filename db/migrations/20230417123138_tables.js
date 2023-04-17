/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('users', function(table) {
    table.increments();
    table.string('firstname');
    table.string('lastname');
    table.string('email').notNullable().unique();
    table.string('password').notNullable();
    table.boolean('is_supper');
    table.boolean('is_online');
    table.boolean('deleted').defaultTo(false)
    table.boolean('active').defaultTo(false);
    table.timestamps();
}).createTable('countries', function(table) {
    table.increments();
    table.string('names');
    table.timestamps();
}).createTable('regions', function(table) {
    table.increments();
    table.string('names');
    table.integer('country_id');
    table.timestamps();
    table.foreign('country_id').references('countries.id');
}).createTable('producers', function(table) {
    table.increments();
    table.string('names');
    table.string('addresses');
    table.integer('region_id');
    table.timestamps();
    table.foreign('region_id').references('regions.id');;
}).createTable('suppliers', function(table) {
    table.increments();
    table.string('names');
    table.string('addresses');
    table.integer('region_id');
    table.timestamps();
    table.foreign('region_id').references('regions.id');;
}).createTable('shipments', function(table) {
    table.increments();
    table.string('shipment_id');
    table.string('origin_id');
    table.string('destination_id');
    table.double('quantities');
    table.integer('status');
    table.timestamps();
    table.foreign('origin_id').references('producers.id');;
    table.foreign('destination_id').references('suppliers.id');;
})
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
};
