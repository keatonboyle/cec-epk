= Compiling the EPK =
== Slim to HTML ==
To make html changes, make changes to index.slim, and then run
    slimrb index.slim index.html
to compile to HTML.  (you'll need to install slim)

To make css changes, make changes to scss/style.scss, and then run
    sass scss/:css/
Or run
    sass --watch scss/:css/
in the background as you make changes to update in realtime.

= Cloning and deploying the EPK =
    # (run on your local *nix machine, or the equivalent windows commands)

    mkdir epk
    cd epk
    git clone campusev@campuseventsblog.com:repos/epk.git .

    git checkout master

    # hack hack hack

    git commit -am "message"
    git push origin master
    # now master is updated, we can collaborate, etc, but users can't see it

    # update the live branch with the changes
    git checkout live
    git merge master -m "merge message"

    # push live to the remote repo, this will trigger a post-receive hook that
    #  updates the public html directory (see repos/epk.git/hooks/post-receive)
    git push origin live

    # and then head back to master to hack again
    git checkout master

Reach out to keatonboyle@gmail.com w/ questions
