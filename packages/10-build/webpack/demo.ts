
let x: string = 'world'

module.exports = {
  a: 'hello',
  callMe: function() {
    console.log(this.a + ' '+ x)
  },
}