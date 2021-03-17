// DO YOUR MAGIC
exports.up = function(knex) {
    return knex.schema
        .createTable("Cars", table => {
            table.increments('car_id')
            table.text('vin').unique().notNullable()
            table.text('make').notNullable()
            table.text('model').notNullable()
            table.decimal('mileage').notNullable()
            table.text('title')
            table.text('transmission')
        })
}

exports.down = function(knex) {
    return knex.schema.dropTableIfExists("Cars")
}