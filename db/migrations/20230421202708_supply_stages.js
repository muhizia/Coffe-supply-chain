/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('statuses', function(table) {
        table.increments();
        table.string('statuses');
        table.boolean('deleted').defaultTo(false)
        table.boolean('active').defaultTo(false);
        table.timestamps();
    }).createTable('supply_info', function(table) {
        table.increments();
        table.string('stages');
        table.integer('status_id');
        table.string('description', 1000);
        table.boolean('deleted').defaultTo(false)
        table.boolean('active').defaultTo(false);
        table.timestamps();
        table.foreign('status_id').references('statuses.id');
    }).createTable('shipments_supply_info', function(table) {
        table.increments();
        table.string('description', 1000);
        table.boolean('deleted').defaultTo(false)
        table.integer('shipment_id');
        table.integer('supply_info_id');
        table.foreign('shipment_id').references('shipments.id');
        table.foreign('supply_info_id').references('supply_info.id');
        table.timestamps();
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
};
