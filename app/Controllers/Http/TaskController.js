'use strict'

const Task = use('App/Models/Task')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with tasks
 */
class TaskController {
  /**
   * Show a list of all tasks.
   * GET tasks
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index ({ response }) {
    const tasks = await Task.all()

    if (tasks) {
      response.status(200).json({
        message: 'Here are your tasks',
        data: tasks
      })
    } else {
      response.status(500).json({
        message: 'Could not get your tasks.'
      })
    }
  }

  /**
   * Create/save a new task.
   * POST tasks
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response }) {
    const task = new Task()

    const { name, description, project_id } = request.post()

    task.name = name
    task.description = description
    task.project_id = project_id

    const saved = await task.save()

    if (saved) {
      response.status(201).json({
        message: 'Created a new task.',
        data: task
      })
    } else {
      response.status(500).json({
        message: 'Could not create your task.',
        data: { name, description, project_id }
      })
    }
  }

  /**
   * Display a single task.
   * GET tasks/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show ({ params: {id}, request, response }) {
    const task = await Task.find(id)

    if (task) {
      response.status(200).json({
        message: 'Here is your task.',
        data: task
      })
    } else {
      response.status(404).json({
        message: 'Task not found.',
        id
      })
    }
  }

  /**
   * Update task details.
   * PUT or PATCH tasks/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params:{id}, request, response }) {
    const task = await Task.find(id)

    if (task) {
      const { name, description, project_id } = request.post()

      task.name = name
      task.description = description
      task.project_id = project_id

      const saved = await task.save()

      if (saved) {
        response.status(200).json({
          message: 'Updated task.',
          data: task
        })
      } else {
        response.status(500).json({
          message: 'Could not update your task.',
          data: { name, description, project_id }
        })
      }
    } else {
      response.status(404).json({
        message: 'Task not found.',
        id
      })
    }
  }

  /**
   * Delete a task with id.
   * DELETE tasks/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async delete ({ params:{id}, response }) {
    const task = await Task.find(id)

    if (task) {
      const deleted = await task.delete()

      if (deleted) {
        response.status(200).json({
          message: 'Deleted task.',
          id
        })
      } else {
        response.status(500).json({
          message: 'Could not delete your task.',
          id
        })
      }
    } else {
      response.status(404).json({
        message: 'Task not found.',
        id
      })
    }
  }

  /**
   * Delete a task with id.
   * DELETE tasks/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = TaskController
