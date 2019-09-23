'use strict'

const Project = use('App/Models/Project')
const Database = use('Database')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with projects
 */
class ProjectController {
  /**
   * Show a list of all projects.
   * GET projects
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ response }) {
    const projects = await Project.all()

    if (projects) {
      response.status(200).json({
        message: 'Here are your projects',
        data: projects
      })
    } else {
      response.status(500).json({
        message: 'Could not get your projects.'
      })
    }
  }

  /**
   * Create/save a new project.
   * POST projects
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    const project = new Project()

    const { name, description, customer_id } = request.post()

    project.name = name
    project.description = description
    project.customer_id = customer_id

    const saved = await project.save()

    if (saved) {
      response.status(201).json({
        message: 'Successfully created project.',
        data: project
      })
    } else {
      response.status(500).json({
        message: 'Could not create project.',
        data: { name, description }
      })
    }
  }

  /**
   * Display a single project.
   * GET projects/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params: {id}, response }) {
    const project = await Project.find(id)

    if (project) {
      response.status(200).json({
        message: 'Here is your project.',
        data: project
      })
    } else {
      response.status(404).json({
        message: 'Project not found.',
        id
      })
    }
  }

  /**
   * Update project details.
   * PUT or PATCH projects/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params: {id}, request, response }) {
    const project = await Project.find(id)

    if (project) {
      const { name, description, customer_id } = request.post()

      project.name = name
      project.description = description
      project.customer_id = customer_id

      const updated = await project.save()

      if (updated) {
        response.status(200).json({
          message: 'Project updated.',
          data: project
        })
      } else {
        response.status(500).json({
          message: 'Could not update project.',
          id
        })
      }
    } else {
      response.status(404).json({
        message: 'Project not found.',
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
    const project = await Project.find(id)

     if (project) {
       const deleted = await project.delete()

       if (deleted) {
         response.status(200).json({
           message: 'Project deleted.',
           id
         })
       } else {
         response.status(500).json({
           message: 'Could not delete project.',
           id
         })
       }
     } else {
       response.status(404).json({
         message: 'Project not found.',
         id
       })
     }
  }

  /**
   * Delete a project with id.
   * DELETE projects/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = ProjectController
