#this script generates the jsdoc for all the step types
#the argument to this script should be the full path to the node directory
#e.g. ./generateStepTypesJsdocScript.sh /Users/geoffreykwan/git/WISE-VLE/src/main/webapp/vle/node

if [ $1 ]
then
nodeDir=$1

java -jar jsrun.jar app/run.js -a -t=templates/jsdoc \
$nodeDir/assessmentlist \
$nodeDir/brainstorm \
$nodeDir/cargraph \
$nodeDir/datagraph \
$nodeDir/draw \
$nodeDir/draw/svg-edit/svgdraw.js \
$nodeDir/draw/svg-edit/svgdrawstate.js \
$nodeDir/explanationbuilder \
$nodeDir/fillin \
$nodeDir/flash \
$nodeDir/html \
$nodeDir/ideabasket \
$nodeDir/matchsequence \
$nodeDir/multiplechoice \
$nodeDir/mw \
$nodeDir/mysystem/authorview_mysystem.js \
$nodeDir/mysystem/MySystemNode.js \
$nodeDir/mysystem/mysystemstate.js \
$nodeDir/mysystem2/authorview_mysystem2.js \
$nodeDir/mysystem2/mysystem2.js \
$nodeDir/mysystem2/MySystem2Node.js \
$nodeDir/mysystem2/mysystem2state.js \
$nodeDir/openresponse \
$nodeDir/outsideurl \
$nodeDir/seasons \
$nodeDir/sensor \
$nodeDir/surge \
$nodeDir/table \
$nodeDir/template \
$nodeDir/Node.js \
$nodeDir/nodefactory.js \
$nodeDir/NodeUtils.js \

else
echo 'Error: you must provide the full path to the node directory as an argument'
echo 'e.g.'
echo './generateStepTypesJsdocScript.sh /Users/geoffreykwan/git/WISE-VLE/src/main/webapp/vle/node'
fi