const fisherman = require('fisherman-discord.js')
const CoreCommands = require('./coreCommands')
const options = require('./options.json')
var bot = new fisherman.Fisherman({ prefixes: ['fish!', 'test!'] })
var middleware = new CoreCommands()
bot.use(middleware)
var register = bot.createRegister('test', 'Demo 🎣')
console.log('registerCreated')
register.textCommand('test', null, function (req, res) {
  res.send(`Command infos:\nName: ${req.command.name}\nRegister name: \`${req.command.register.name}\`\nTotal command count in the fisherman client: ${req.client.commands.size}\nPassed through the middleware proof: ${req.test}`, { embed: { description: 'This request was made through the fishman project' } })
})
register.textCommand('ping', null, function (req, res) {
  var current = Date.now()
  res.send('Pinging......').then((message) => {
    message.edit((Date.now() - current) + 'ms')
  })
})
register.textCommand('infos', {aliases: ['about', 'info', 'fisherman']}, function (req, res) {
  res.send('This is just a demonstration of what fisherman can do.\nFisherman is a lightweight, fast, and powerful discord command router written in javascript standard style and inspired by expressjs\nGithub : https://github.com/maxerbox/fisherman-discord.js\n:bookmark: Documentation: https://maxerbox.github.io/fisherman-discord.js/')
})
register.promiseCommand(['text'], 'promise', null, function (req, res, resolve, reject) {
  res.send('Resolving the promise command')
  resolve({message: "I'm resolved yeeeeeeeeeeeeeee"})
})
register.promiseCommand(['text'], 'promisereject', null, function (req, res, resolve, reject) {
  res.send('Rejecting the promise command')
  reject(new Error("I'm rejected"))
})
bot.init(options.token)
bot.on('initialized', function () {
  console.log('init')
})
bot.on('fisherCode', function (router, code, err) {
  router.response.send('fisherCode ' + code + '\nError message: ' + err.message)
})
