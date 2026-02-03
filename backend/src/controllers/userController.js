const User = require('../models/User')

exports.getProfile = async (req, res) => {
    res.json({
        success: true,
        user: {
            id: req.user._id,
            name: req.user.name,
            email: req.user.email,
            createdAt: req.user.createdAt
        }
    })
}

exports.updateProfile = async (req, res) => {
    try {
        const { name, email } = req.body

        const user = await User.findByIdAndUpdate(
            req.user._id,
            { name, email },
            { new: true, runValidators: true }
        )

        res.json({
            success: true,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        })
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}
