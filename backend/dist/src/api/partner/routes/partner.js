"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    routes: [
        {
            method: 'GET',
            path: '/partners',
            handler: 'partner.find',
            config: {
                policies: [],
            },
        },
        {
            method: 'GET',
            path: '/partners/:id',
            handler: 'partner.findOne',
            config: {
                policies: [],
            },
        },
    ],
};
