import { Token } from '../../utils/Token'

describe('Token', () => {
  it('Should generate a Json Web Token', () => {
    const token = Token.generateToken('user@gmail.com', '478643276214')

    expect(token.length).toBeGreaterThan(20)
  })
})
