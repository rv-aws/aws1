import { Construct } from "constructs";
import { App, TerraformStack, TerraformOutput } from "cdktf";
import { AwsProvider, ec2 } from "./.gen/providers/aws";

class MyStack extends TerraformStack {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    new AwsProvider(this, "AWS", {
      region: "us-east-1",
    });

    const instance = new ec2.Instance(this, "compute", {
      ami: "ami-0022f774911c1d690",
      instanceType: "t1.micro",
      vpcSecurityGroupIds: ["sg-07c5e4aaea77986eb"],
      subnetId: "subnet-0068cdb5f2be8fea8",
    });

    new TerraformOutput(this, "public_ip", {
      value: instance.publicIp,
    });
  }
}

const app = new App();
new MyStack(app, "aws1");

// new RemoteBackend(stack, {
//   hostname: "app.terraform.io",
//   organization: "<YOUR_ORG>",
//   workspaces: {
//     name: "learn-cdktf",
//   },
// });

app.synth();
