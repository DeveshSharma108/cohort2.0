

export default {
	async fetch(request, env, ctx): Promise<Response> {
		console.log(request.body)
		console.log(request.method)
		console.log(request.headers)

		if (request.method === "GET") {
			return Response.json({message:"You sent a get request"})
		} else {
			return Response.json({message:"You did not sent a get request"})
		}
	},
} satisfies ExportedHandler<Env>;
