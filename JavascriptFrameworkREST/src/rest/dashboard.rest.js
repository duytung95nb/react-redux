'use strict';

import {restContext, get, put, post, paramMapping, pParam, body} from '../core/rest'
import {rest, inject} from '../core/inject'

/**
 * Dashboard Restful API
 */
@rest
@restContext('/dashboards')
export class DashboardRest {

    @inject
    dashboardService

    @get('/')
    getAll() {
        return this.dashboardService.getAll();
    }

    @get('/:id')
    @paramMapping(pParam('id'))
    get(id) {
        return this.dashboardService.get(id);
    }

    @put('/:id')
    @paramMapping(pParam('id'), body)
    update(id, dashboard) {
        dashboard.id = id;
        return this.dashboardService.update(dashboard);
    }
    
    @post('/_search')
    @paramMapping(body)
    search(criteria) {
        return this.dashboardService.find(criteria);
    }
}