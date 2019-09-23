'use strict'

const Customer = use('App/Models/Customer')
const Database = use('Database')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with customers
 */
class CustomerController {
  /**
   * Show a list of all customers.
   * GET customers
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ response }) {
    const customers = await Customer.all()

    if(customers){
      response.status(200).json({
        message: 'Here are your customers',
        data: customers
      })
    }else{
      response.status(500).json({
        message: 'Could not fetch the customers'
      })
    }
  }

  /**
   * Create/save a new customer.
   * POST customers
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    const customer = new Customer()

    const { name, description } = request.post()

    customer.name = name
    customer.description = description

    const saved = await customer.save()
    if(saved){
      response.status(201).json({
        message: 'Successfully created a new customer.',
        data: customer
      })
    }else{
      response.status(500).json({
        message: 'Could not create customer',
        data: { name, description }
      })
    }
  }

  /**
   * Display a single customer.
   * GET customers/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params:{id}, response }) {
    const customer = await Customer.find(id)

    if(customer){
      response.status(200).json({
        message: 'Here is your customer',
        customer
      })
    }else{
      response.status(404).json({
        message: 'Customer not found',
        id
      })
    }
  }

  /**
   * Update customer details.
   * PUT or PATCH customers/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params:{id}, request, response }) {
    const { name, description } = request.post()

    const customer = await Customer.find(id)

    if(customer){
      customer.name = name
      customer.description = description

      const updated = await customer.save()
      if(updated){
        response.status(200).json({
          message: 'Successfully updated customer',
          id
        })
      }else{
        response.status(500).json({
          message: 'Could not update customer',
          id
        })
      }
    }else{
      response.status(404).json({
        message: 'Customer not found',
        id
      })
    }
  }

  /**
   * Delete a customer with id.
   * DELETE customers/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async delete ({ params:{id}, response }) {
    const customer = await Customer.find(id)

    if(customer){
      const deleted = await customer.delete()

      if(deleted){
        response.status(200).json({
          message: 'Successfully deleted customer',
          id
        })
      }else{
        response.status(500).json({
          message: 'Could not delete customer',
          id
        })
      }
    }else{
      response.status(404).json({
        message: 'Customer not found',
        id
      })
    }
  }

  /**
   * Delete a customer with id.
   * DELETE customers/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = CustomerController
