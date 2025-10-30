const helloworld = (req, res) => {
    res.send('Hello World!')
};

const hellobruce = (req, res) => {
    res.send('Hello Bruce!')
}

const helloNayelly = (req, res) => {
    res.send('Hello Nayelly, te quiero muchooo! ❤️')
}

module.exports = {
    helloworld,
    hellobruce,
    helloNayelly
};