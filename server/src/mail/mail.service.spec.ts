import { MailService } from './mail.service'
import { Test } from '@nestjs/testing'
import { MAIL_CONFIG_OPTIONS, MAILGUN } from './mail.constant'
import { MailModuleOptions, TemplateVariables } from './interface/mail-module-options'

const TEST_FROM = 'testFrom'
const TEST_DOMAIN = 'testDomain'
const TEST_API_kEY = 'testApiKey'
const TEST_SUBJECT = 'testSubject'
const TEST_TEMPLATE = 'testTemplate'
const TEST_VARIABLES: TemplateVariables = {
  name: 'testName',
  value: 'testValue',
}

const mockedMailgunClient = {
  messages: {
    create: jest.fn(),
  },
}

describe('MailService', () => {
  let service: MailService
  let mailgun: typeof mockedMailgunClient

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        MailService,
        {
          provide: MAIL_CONFIG_OPTIONS,
          useValue: {
            from: TEST_FROM,
            domain: TEST_DOMAIN,
            apiKey: TEST_API_kEY,
          } as MailModuleOptions,
        },
        {
          provide: MAILGUN,
          useValue: mockedMailgunClient,
        },
      ],
    }).compile()

    service = moduleRef.get<MailService>(MailService)
    mailgun = moduleRef.get(MAILGUN)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('sendMail', () => {
    it('should call mailgun client', async () => {
      const testMessageData = {
        from: `Excited User <me@${TEST_DOMAIN}>`,
        to: 'yuseunghwan94@gmail.com',
        subject: TEST_SUBJECT,
        template: TEST_TEMPLATE,
        [`v:${TEST_VARIABLES.name}`]: TEST_VARIABLES.value,
      }

      const result = await service.sendMail(TEST_SUBJECT, TEST_TEMPLATE, [TEST_VARIABLES])

      expect(mailgun.messages.create).toHaveBeenCalledTimes(1)
      expect(mailgun.messages.create).toHaveBeenCalledWith(TEST_DOMAIN, testMessageData)
    })
  })
  describe('parseTemplateVariables', () => {})
})
