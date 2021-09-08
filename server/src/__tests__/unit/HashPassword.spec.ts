import { HashPassword } from '../../utils/HashPassword'

describe('Hash Password', () => {
  it('Should encrypt the password', async () => {
    const hashedPassword = await HashPassword.generateHash('secret')

    expect(hashedPassword).not.toBe('secret')
    expect(hashedPassword.length).toBeGreaterThan(7)
  })

  it('Should compare the hash', async () => {
    const hashedPassword = await HashPassword.generateHash('secret')
    const matchPassword = await HashPassword.compareHash('secret', hashedPassword)
    const notMatchPassword = await HashPassword.compareHash('secret1', hashedPassword)

    expect(matchPassword).toBe(true)
    expect(notMatchPassword).toBe(false)
  })
})
