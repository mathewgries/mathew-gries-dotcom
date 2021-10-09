import * as sst from "@serverless-stack/resources";
import { HostedZone } from "@aws-cdk/aws-route53";

export default class ApiStack extends sst.Stack {
  api;

  constructor(scope, id, props) {
    super(scope, id, props);

    const { table } = props;

    this.api = new sst.Api(this, "Api", {
      customDomain:
        scope.state === "prod"
          ? {
              domainName: "mathewgries.com",
              hostedZone: HostedZone.fromHostedZoneAttributes(this, "MathewGriesDotComZone", {
                hostedZoneId: "ZL9TX5SVZ0693",
                zoneName: "prod.api.mathewgries.com",
              }),
            }
          : {
              domainName: "mathewgries.com",
              hostedZone: HostedZone.fromHostedZoneAttributes(this, "MathewGriesDotComZone", {
                hostedZoneId: "Z06088022M0F3LB0V7ZN",
                zoneName: "dev.api.mathewgries.com",
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
