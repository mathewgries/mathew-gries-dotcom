import * as sst from "@serverless-stack/resources";
import { HostedZone } from "@aws-cdk/aws-route53";

export default class ApiStack extends sst.Stack {
  api;

  constructor(scope, id, props) {
    super(scope, id, props);

    const { table } = props;
    const { stage } = this.node.root;

    this.api = new sst.Api(this, "Api", {
      customDomain: HostedZone.fromLookUp(this, "mathewGriesDOTCOMZone", {
        domain: `www.${stage}.api.mathewgries.com`,
      }),
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
