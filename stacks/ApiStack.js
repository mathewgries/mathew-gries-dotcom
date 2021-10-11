import * as sst from "@serverless-stack/resources";
import { HostedZone } from "@aws-cdk/aws-route53";

export default class ApiStack extends sst.Stack {
  api;

  constructor(scope, id, props) {
    super(scope, id, props);

    const { table } = props;
    const { stage } = this.node.root;

    this.api = new sst.Api(this, "Api", {
      customDomain: {
        domainName: "mathewgries.com",
        hostedZone: HostedZone.fromHostedZoneAttributes(this, "MyZone", {
          hostedZoneId:
            stage === "prod" ? "Z0446746E7NKHGM6KRL7" : "Z075300910GQYU7TM9XRM",
          zoneName:
            stage === "prod"
              ? "prod.api.mathewgries.com"
              : "dev.api.mathewgries.com",
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
