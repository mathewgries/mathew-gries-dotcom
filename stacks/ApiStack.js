import * as sst from "@serverless-stack/resources";
import { HostedZone } from "@aws-cdk/aws-route53";

export default class ApiStack extends sst.Stack {
  api;

  constructor(scope, id, props) {
    super(scope, id, props);

    const { table } = props;
    const certArn =
      "	arn:aws:acm:us-east-1:025747659854:certificate/b54adf90-1c69-4fb5-bf07-79af60466757";

    this.api = new sst.Api(this, "Api", {
      customDomain:
        scope.state === "prod"
          ? {
              domainName: "mathewgries.com",
              hostedZone: HostedZone.fromHostedZoneAttributes(this, "MyZone", {
                hostedZoneId: "ZL9TX5SVZ0693",
                zoneName: "prod.api.mathewgries.com",
                certificate: Certificate.fromCertificateArn(
                  this,
                  "MyCert",
                  certArn
                ),
              }),
            }
          : {
              domainName: "mathewgries.com",
              hostedZone: HostedZone.fromHostedZoneAttributes(this, "MyZone", {
                hostedZoneId: "Z06088022M0F3LB0V7ZN",
                zoneName: "www.dev.api.mathewgries.com",
                certificate: Certificate.fromCertificateArn(
                  this,
                  "MyCert",
                  certArn
                ),
              }),
            },
      defaultAuthorizationType: "AWS_IAM",
      defaultFunctionProps: {
        environment: {
          TABLE_NAME: table.tableName,
        },
      },
      cors: true,
      routes: {},
    });

    this.api.attachPermissions([table]);

    this.addOutputs({
      ApiEndpoint: this.api.customDomainUrl || this.api.url,
    });
  }
}
