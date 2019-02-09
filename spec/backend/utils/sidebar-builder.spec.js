const sidebarBuilder = require('@backend/utils/sidebar-builder')

describe('SidebarBuilder', function () {
  describe('#build', function () {
    beforeEach(function () {
      this.parent1 = { name: 'parentName1', icon: 'icon1' }
      this.parent2 = { name: 'parentName2', icon: 'icon2' }
      this.resources = [
        {
          decorate: this.sinon.stub().returns({
            getParent: this.sinon.stub().returns(this.parent1),
          }),
        },
        {
          decorate: this.sinon.stub().returns({
            getParent: this.sinon.stub().returns(this.parent1),
          }),
        },
        {
          decorate: this.sinon.stub().returns({
            getParent: this.sinon.stub().returns(this.parent2),
          }),
        },
      ]
    })

    it('returns object having 2 parents', function () {
      const resources = sidebarBuilder(this.resources)
      expect(resources).to.have.all.keys(this.parent1.name, this.parent2.name)
    })

    it('both parents has correct icons', function () {
      const resources = sidebarBuilder(this.resources)
      expect(resources[this.parent1.name].icon).to.equal(this.parent1.icon)
      expect(resources[this.parent2.name].icon).to.equal(this.parent2.icon)
    })

    it('both parents have correct resources', function () {
      const resources = sidebarBuilder(this.resources)
      expect(resources[this.parent1.name]).to.have.lengthOf(2)
      expect(resources[this.parent2.name]).to.have.lengthOf(1)
    })
  })
})
