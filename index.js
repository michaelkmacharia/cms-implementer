#!/usr/bin/env node

`use strict` ;

const dotenv = require ( `dotenv` ) . config () ;

const { AdminUIApp } = require ( `@keystonejs/app-admin-ui` ) ;

const { GraphQLApp } = require ( `@keystonejs/app-graphql` ) ;

const { Keystone } = require ( `@keystonejs/keystone` ) ;

const { MongooseAdapter : Adapter } = require ( `@keystonejs/adapter-mongoose` ) ;

const { PasswordAuthStrategy } = require ( `@keystonejs/auth-password` ) ;

const Posts = require ( `./schemas/Posts` ) ;

const Users = require ( `./schemas/Users` ) ;

const PROJECT_NAME = `cms-implementer` ;

const isAdmin = ( ( { authentication : { item : user } } ) =>
	{
		return ( !! user && !! user . isAdmin ) ;
	}
) ;

const isLoggedIn = ( ( { authentication : { item : user } } ) =>
	{
		return ( !! user ) ;
	}
) ;

const adapterConfig = { mongoUri : process . env . MONGODB_URI } ;

const keystone = new Keystone (
	{
		adapter : new Adapter ( adapterConfig ) ,
		cookieSecret : process . env . COOKIE_SECRET ,
	}
) ;

keystone . createList ( `Posts` ,
	{
		fields : Posts . fields ,
		access :
		{
			read : true ,
			create : isLoggedIn ,
			update : isLoggedIn ,
			delete : isLoggedIn ,
		} ,
	}
) ;

keystone . createList ( `Users` ,
	{
		fields : Users . fields ,
		access :
		{
			read : true ,
			create : isAdmin ,
			update : isAdmin ,
			delete : isAdmin ,
		} ,
	}
) ;

const authStrategy = keystone . createAuthStrategy (
	{
		type : PasswordAuthStrategy ,
		list : `Users` ,
		config :
		{
			identityField : `email` ,
			secretField : `password` ,
		} ,
	}
) ;

module . exports = (
	{
		keystone ,
		apps : [
			new GraphQLApp () ,
			new AdminUIApp (
				{
					name : PROJECT_NAME ,
					enableDefaultRoute : true ,
					authStrategy ,
					isAccessAllowed : isAdmin ,
				}
			) ,
		] ,
	}
) ;
