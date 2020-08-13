# Twilio Account Cloudformation Custom Resource
A lambda function that allows you to create subaccounts as a cloudformation custom resource.

## Usage
The first step in creating twilio accounts as custom resources in Cloudfront is to deploy this stack which enables the creation of twilio accounts as a custom resource. After you've deployed this stack you'll have the ability to reference this stack to create, update and delete twilio accounts in other stacks.  

1. Clone this repo, cd into it and `npm install` the dependencies. 
2. Ensure you have the AWS CLI set up properly and run the following command. The accountSid and authToken should be taken from your twilio main account in which you want to create sub accounts under. Wait for serverless to confirm a successfull deployment. 
```
npx serverless deploy --stage prod --accountSid ACXXX --authToken XXX
```
3. You can create twilio accounts as a custom resource in any cloudformation stack in your account. An example of which can be shown below. 

```yml
resources:
  Resources:
    TwilioAccount:
      Type: Custom::TwilioAccount
      Properties:
        FriendlyName: SubAccountTest
        ServiceToken: ${cf:cf-custom-resource-twilio-prod.AccountLambdaFunctionQualifiedArn}

  Outputs:
    TwilioAuthToken:
      Value: !GetAtt TwilioAccount.authToken
      Export:
        Name: 'authToken'
    TwilioAccountSid:
        Value: !GetAtt TwilioAccount.accountSid
        Export:
         Name: 'accountSid'

```
