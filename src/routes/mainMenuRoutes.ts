
import express from "express";
import { RouteLookup } from "../controllers/lookups/routingLookup";
import * as ProductListingRouteController from "../controllers/mainMenuRouteController";

function productListingRoutes(server: express.Express) {
server.get(RouteLookup.MainMenu, MainMenuRouteController.start);
}

module.exports.routes = mainMenuRoutes;
