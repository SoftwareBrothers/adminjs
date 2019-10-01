import ActionDecorator from './action-decorator'

describe('ActionDecorator', function () {
  describe('#handler', function () {
    it('calls the before action when it is given', async function () {
      const mockedRequest = { response: true }
      const request = { response: true }
      const decorator = new ActionDecorator({
        action: {
          before: this.sinon.stub().returns(mockedRequest),
          handler: this.sinon.stub(),
          actionType: ['resource', 'record'],
        },
        admin: { options: {} },
      })
      await decorator.handler(request, 'res', { context: 'data' })
      expect(decorator.action.before).to.have.been.calledWith(request)
      expect(decorator.action.handler).to.have.been.calledWith(
        this.sinon.match(mockedRequest),
      )
    })

    it('calls the after action when it is given', async function () {
      const data = { records: true }
      const modifiedData = { records: false }
      const decorator = new ActionDecorator({
        action: {
          handler: this.sinon.stub().returns(data),
          after: this.sinon.stub().returns(modifiedData),
          actionType: ['resource', 'record'],
        },
        admin: { options: {} },
      })
      expect(await decorator.handler('req', 'res', { context: 'data' })).to.equal(modifiedData)
      expect(decorator.action.handler).to.have.been.called
      expect(decorator.action.after).to.have.been.calledWith(data)
    })
  })
})
