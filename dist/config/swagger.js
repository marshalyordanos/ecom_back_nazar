"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerSpec = void 0;
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'LMS API Documentation',
            version: '1.0.0',
            description: 'Learning Management System API - Similar to Coursera',
            contact: {
                name: 'API Support',
                email: 'support@lms.com',
            },
        },
        servers: [
            {
                url: 'http://localhost:8000/api/v1',
                description: 'Development server',
            },
            {
                url: 'https://api.lms.com/api/v1',
                description: 'Production server',
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
            schemas: {
                Error: {
                    type: 'object',
                    properties: {
                        status: {
                            type: 'string',
                            example: 'fail',
                        },
                        message: {
                            type: 'string',
                            example: 'Error message',
                        },
                    },
                },
                Pagination: {
                    type: 'object',
                    properties: {
                        total: {
                            type: 'number',
                            example: 100,
                        },
                        page: {
                            type: 'number',
                            example: 1,
                        },
                        pageSize: {
                            type: 'number',
                            example: 10,
                        },
                        totalPages: {
                            type: 'number',
                            example: 10,
                        },
                    },
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
    },
    apis: ['./src/routes/**/*.ts'], // Path to the API routes
};
exports.swaggerSpec = (0, swagger_jsdoc_1.default)(options);
//# sourceMappingURL=swagger.js.map