/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('statuses').del()
  await knex('statuses').insert([
    {id: 1, statuses: 'Pending'},
    {id: 2, statuses: 'In transit'},
    {id: 3, statuses: 'Delivered'}
  ]);
  
  await knex('supply_info').del()
  await knex('supply_info').insert([
    {id: 1, stages: 'Planting', status_id: 1, 'description': ''},
    {id: 2, stages: 'Harversting', status_id: 1, 'description': ''},
    {id: 3, stages: 'Drying', status_id: 1, 'description': ''},
    {id: 4, stages: 'Milling', status_id: 1, 'description': ''},
    {id: 5, stages: 'Roasting', status_id: 1, 'description': ''},
    {id: 6, stages: 'Importing/Exporting', status_id: 2, 'description': ''},
    {id: 7, stages: 'Retail/Restorant/Caffe Resto', status_id: 3, 'description': ''},
    {id: 8, stages: 'Consumer', status_id: 3, 'description': ''}
  ]);

  await knex('shipments_supply_info').del()
  await knex('shipments_supply_info').insert([
    {id: 1, shipment_id: 1, supply_info_id: 1, 'description': 'Planting Coffee'},
    {id: 2, shipment_id: 1, supply_info_id: 2, 'description': 'Harversting Coffee'},
    {id: 3, shipment_id: 1, supply_info_id: 3, 'description': 'Drying Coffee'},
    {id: 4, shipment_id: 1, supply_info_id: 6, 'description': 'Drying Coffee'},
    {id: 5, shipment_id: 2, supply_info_id: 1, 'description': 'Planting Coffee'},
    {id: 6, shipment_id: 2, supply_info_id: 2, 'description': 'Harversting Coffee'},
  ]);
  
};
