# groupproject_bdossp
Group Project for Class

* Please note: never type []. They are used to illustrate user inputs.

## Below are the following steps for running this project
Source appropriate files for nova command and select appropriate project number. Ensure openstack is loaded:
```bash
source ~/.cloudmesh/clouds/india/kilo/openrc.sh
source ~/.cloudmesh/clouds/india/kilo/fg491
module load openstack
```

Start an ssh agent and add your own credentials:
```bash
eval $(ssh-agent -s)
ssh-add ~/.ssh/[insert ssh key]
```

Launch a Virtual Machine via nova:
```bash
nova boot --flavor m1.medium --image Ubuntu-15.10-64 --key_name [insert ssh key] [insert virtual machine name] --nic net-id=e5228c15-38af-4f91-a6de-1590d399427e
```

Generate a floating ip-address and associate it with your virtual machine:
```bash
nova floating-ip-create ext-net
nova floating-ip-associate [insert virtual machine name] [IP address]
```

Ensure you can ssh into your machine:
```bash
ssh ubuntu@[IP address]
```

Clone project repository from github:
```bash
git clone git@github.iu.edu:tehauger/groupproject_bdossp.git
cd [insert user github directory]
git branch master
git checkout master
git pull https://github.iu.edu/tehauger/groupproject_bdossp.git master
git push -u origin master
```

Update inventory file with the [IP address] of your virtual machine:
```bash
nano inventory 
```
> You will need to replace ip address in the inventory file with [VM IP address] of your virtual machine.

Create a separate virtualenv and install ansible:
```bash
virtualenv $HOME/[insert directory of your choice]
source $HOME/[insert directory of your choice that you just created]/bin/activate
pip install --trusted-host pypi.python.org ansible 
```

Navigate to groupproject_bdossp directory and run the following code:
```bash
cd [file/path/to/groupproject_bdossp]

export ANSIBLE_TRANSPORT="ssh"
export ANSIBLE_SSH_ARGS="-o ForwardAgent=yes" 

ansible-playbook -i inventory -c ssh enable-root-access.yml
ansible-playbook -i inventory -c ssh site.yml
```

Now open a browser and type in the ip address of your virtual machine into the address bar:
```bash
http://[IP address]
```

Enjoy exploring the U.S. unemployment rate data and population density change.
