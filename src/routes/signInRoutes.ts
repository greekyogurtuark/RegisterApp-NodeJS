import express from "express";
import { RouteLookup } from "../controllers/lookups/routingLookup";
import * as signInRouteController from "../controllers/signInRouteController";

function productDetailRoutes(server: express.Express) {
	server.get(
		RouteLookup.ProductDetail,
		ProductDetailRouteController.start);
	server.get(
		(RouteLookup.ProductDetail + RouteLookup.ProductIdParameter),
		ProductDetailRouteController.start);

	server.put(
		(RouteLookup.API + RouteLookup.ProductDetail
			+ RouteLookup.ProductIdParameter),
		ProductDetailRouteController.updateProduct);

	server.post(
		(RouteLookup.API + RouteLookup.ProductDetail),
		ProductDetailRouteController.createProduct);

	server.delete(
		(RouteLookup.API + RouteLookup.ProductDetail
			+ RouteLookup.ProductIdParameter),
		ProductDetailRouteController.deleteProduct);
}

module.exports.routes = productDetailRoutes;
