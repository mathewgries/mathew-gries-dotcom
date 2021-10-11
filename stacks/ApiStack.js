import * as sst from "@serverless-stack/resources";
import { HostedZone } from "@aws-cdk/aws-route53";

export default class ApiStack extends sst.Stack {
  api;

  constructor(scope, id, props) {
    super(scope, id, props);

    const { table } = props;
    const { stage } = this.node.root;
    const certArn =
      "arn:aws:acm:us-east-1:025747659854:certificate/73f5ae64-fdbf-4c43-914e-9c9cca2bd196";

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
