import * as sst from "@serverless-stack/resources";
import { HostedZone } from "@aws-cdk/aws-route53";
import { Certificate } from "@aws-cdk/aws-certificatemanager";

export default class FrontendStack extends sst.Stack {
  constructor(scope, id, props) {
    super(scope, id, props);

    const { api, auth, bucket } = props;
    const certArn =
      "arn:aws:acm:us-east-1:025747659854:certificate/73f5ae64-fdbf-4c43-914e-9c9cca2bd196";

    // Define our React app
    const site = new sst.ReactStaticSite(this, "ReactSite", {
      path: "frontend",
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
      SiteUrl: site.url,
    });
  }
}
