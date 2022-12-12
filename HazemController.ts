
      import { inject } from '@adonisjs/fold'
      import HazemService from 'App/Modules/Hazem/Services/HazemService'

      @inject()
      export default class HazemController {

        constructor(private hazemService: HazemService) {}
      }