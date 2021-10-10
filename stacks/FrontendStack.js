import * as sst from "@serverless-stack/resources";
import { HostedZone } from "@aws-cdk/aws-route53";

export default class FrontendStack extends sst.Stack {
  constructor(scope, id, props) {
    super(scope, id, props);

    const { api, auth, bucket } = props;

    const certArn =
      "	arn:aws:acm:us-east-1:025747659854:certificate/b54adf90-1c69-4fb5-bf07-79af60466757";

    // Define our React app
    const site = new sst.ReactStaticSite(this, "ReactSite", {
      path: "frontend",
      customDomain:
        scope.state === "prod"
          ? {
              domainName: "mathewgries.com",
              hostedZone: HostedZone.fromHostedZoneAttributes(
                this,
                "MathewGriesDotComZone",
                {
                  hostedZoneId: "ZL9TX5SVZ0693",
                  zoneName: "www.mathewgries.com",
                  certificate: Certificate.fromCertificateArn(
                    this,
                    "MyCert",
                    certArn
                  ),
                }
              ),
            }
          : {
              domainName: "mathewgries.com",
              hostedZone: HostedZone.fromHostedZoneAttributes(
                this,
                "MathewGriesDotComZone",
                {
                  hostedZoneId: "Z06088022M0F3LB0V7ZN",
                  zoneName: "www.dev.mathewgries.com",
                  certificate: Certificate.fromCertificateArn(
                    this,
                    "MyCert",
                    certArn
                  ),
                }
              ),
            },
      // Pass in our environment variables
      environment: {
        REACT_APP_API_URL: api.customDomainUrl || api.url,
        REACT_APP_REGION: scope.region,
        REACT_APP_BUCKET: bucket.bucketName,
        REACT_APP_USER_POOL_ID: auth.cognitoUserPool.userPoolId,
        REACT_APP_IDENTITY_POOL_ID: auth.cognitoCfnIdentityPool.ref,
        REACT_APP_USER_POOL_CLIENT_ID:
          auth.cognitoUserPoolClient.userPoolClientId,
      },
    });

    // Show the url in the output
    this.addOutputs({
      SiteUrl: site.customDomainUrl || site.url,
    });
  }
}
