const job = {
	get: (req, res) => {
		const prisma = require("../models/prisma")
		const { jobId } = req.params

		prisma.job
			.findUnique({
				where: {
					id: parseInt(jobId),
				},
			})
			.then((job) => {
				if (!job) {
					res.send("Job doesn't exist")
				} else {
					prisma.company
						.findUnique({
							where: {
								id: parseInt(job.companyId),
							},
						})
						.then((company) => {
							job.company = company
							res.send(JSON.stringify(job))
						})
				}
				job
			})
	},
	create: (req, res) => {
		const { companyId } = req.params
		const { title, description, jobUrl } = req.body
		const prisma = require("../models/prisma")

		prisma.job
			.create({
				data: {
					title: title,
					description: description,
					companyId: parseInt(companyId),
					jobUrl: jobUrl,
				},
			})
			.then((job) => {
				res.send(JSON.stringify(job))
			})
	},
	createByName: (req, res) => {
		const { title, description, jobUrl, companyName } = req.body
		const prisma = require("../models/prisma")

		prisma.company
			.findUnique({
				where: {
					name: companyName,
				},
			})
			.then((company) => {
				if (!company) {
					res.send("Company doesn't exist")
				} else {
					prisma.job
						.create({
							data: {
								title: title,
								description: description,
								companyId: parseInt(company.id),
								jobUrl: jobUrl,
							},
						})
						.then((job) => {
							res.send(JSON.stringify(job))
						})
				}
			})
	},
}
module.exports = job
