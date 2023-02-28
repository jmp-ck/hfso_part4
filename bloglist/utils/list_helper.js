
const dummy = (blogs) => {
	return 1
}

const totalLikes = (blogs) => {
	const reducer = (sum, item) => {
		return sum + item.likes
	}
	return blogs.length === 0 ? 0 : blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
	const favorite = blogs.sort( (b1, b2) => (b1.likes < b2.likes) ? 1 : (b1.likes > b2.likes) ? -1 : 0)
	return blogs.length === 0 ? [] : favorite[0]
}

const _ = require('lodash')
const mostBlogs = (blogs) => {
	if (blogs.length === 0)
		return {}
	else {
		const grouped = _.chain(blogs).groupBy('author').groupBy('length').value()
		const maxNumberBlogs = Number(_.chain(grouped).keys().max().value())
		let authorMostBlogs = grouped[maxNumberBlogs][0][0].author
		return authorMostBlogs ? { author: authorMostBlogs, blogs: maxNumberBlogs } : { author: 'Author not found', blogs: maxNumberBlogs }
	}
}

const mostLikes = (blogs) => {
	if (blogs.length === 0)
		return {}
	else {
		const authorMostLikes = _.chain(blogs).groupBy('author').map((blogs, author) => {
			let likes = 0
			_.each(blogs, (blog) => {
				likes += blog['likes']
			})
			return {
				author: author,
				likes: likes
			}
		}).orderBy('likes', 'desc').first().value()

		return authorMostLikes
	}
}

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes }