export enum ParameterLookup {
	EmployeeId = "employeeId",
	ProductId = "productId",
}

export enum QueryParameterLookup {
	ErrorCode = "errorCode"
}

export enum ViewNameLookup {
  SignIn = "signIn",
  MainMenu = "mainMenu",
  ProductDetail = "productDetail",
  ProductListing = "productListing",
  EmployeeDetail = "employeeDetail",
}

export enum RouteLookup {
	// Page routing
	SignIn = "/",
	SignOut = "/signOut",
	MainMenu = "/mainMenu",
	ProductDetail = "/productDetail",
	ProductListing = "/productListing",

	// Page routing - parameters
	ProductIdParameter = "/:productId",
	// End page routing - parameters
	// End page routing

	// API routing
	API = "/api",
	// End API routing
}
