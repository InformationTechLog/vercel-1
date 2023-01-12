import { useWeb3React } from "@web3-react/core";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import styled from "styled-components";
import BallotArtifact from "../artifacts/contracts/Ballot.sol/Ballot.json";
import TokenArtifact from "../artifacts/contracts/Token.sol/MyToken.json";
import TeamArtifact from "../artifacts/contracts/Team.sol/Team.json";
import { getAddress } from "ethers/lib/utils";
import { Input, Button, Flex } from "@chakra-ui/react";

export function CallBallot() {
  const { active, library } = useWeb3React();
  const [ballotContract, setBallotContract] = useState();
  const [ballotContractAddr, setBallotContractAddr] = useState("");
  const [signer, setSigner] = useState();
  const [teamName, setTeamName] = useState("");
  const [memberName, setMemberName] = useState("");
  const [lectureName, setLectureName] = useState("");
  const [tokenAmount, setTokenAmount] = useState(0);
  const [teamLeaderName, setTeamLeaderName] = useState("");
  const [memberAddress, setMemberAddress] = useState("");
  const [eventName, setEventName] = useState("");
  const [eventToken, setEventToken] = useState(0);

  useEffect(() => {
    if (!library) {
      setSigner(undefined); //library없는경우 undefined하고 넘김
      return;
    }
    setSigner(library.getSigner());
  }, [library]);

  const handleDeployContract = (event) => {
    event.preventDefault();
    // require(lectureName=)
    if (ballotContract) {
      return;
    }
    async function deployBallotContract() {
      const Ballot = new ethers.ContractFactory(
        BallotArtifact.abi,
        BallotArtifact.bytecode,
        signer
      );
      try {
        //ballotContract만들어주셨음!!
        //Ballot.setAddrName("afsdfas")
        //Ballot.setPoll("asdfsadf")
        const ballotContract = await Ballot.deploy(
          lectureName,
          tokenAmount,
          teamLeaderName
        );

        // 배포된 컨트랙트에 입력값이 잘 출력되는지 확인하는 코드 (greeting contract안의 greet 함수 호출)
        // const ballot = await ballotContract.ballot();
        // await ballotContract.setAddrName(
        //   "0x7EE24009C4E69fCD689561D0f48eC43fc75A0a1d",
        //   teamLeaderName
        // );
        // const user = await ballotContract.getAddrName();
        // const ballot = await ballotContract.setAddrName("김형준");

        //저장
        setBallotContract(ballotContract);
        //저장
        // setBallot(ballot);
        // 배포가된 컨트랙트 주소 저장
        setBallotContractAddr(ballotContract.address);
        // 배포된 컨트랙트주소 받기 경고창으로
        window.alert(`Ballot deployed to : ${ballotContract.address}`);

        // await로   deployed로 구성
        const deployedContract = await ballotContract.deployed();
      } catch (error) {
        window.alert(
          "Error: " + (error && error.message ? `${error.message}` : "")
        );
      }
    }
    deployBallotContract();
  };
  const handleAddMember = async () => {
    if (!ballotContract) {
      window.alert("먼저 배포해주세요~");
      return;
    }
    try {
      await ballotContract.setAddrName(memberAddress, memberName);
      const res = await ballotContract.getAddrName();
      console.log(res);
      await ballotContract.deployed();
    } catch (error) {
      window.alert(
        "Error: " + (error && error.message ? `${error.message}` : "")
      );
    }
  };

  const handlesetUser = async () => {
    if (!ballotContract) {
      window.alert("먼저 배포해주세요~");
      return;
    }
    try {
      await ballotContract.setUser();
      const res = await ballotContract.getUser(memberAddress);
      console.log(res);
      await ballotContract.deployed();
    } catch (error) {
      window.alert(
        "Error: " + (error && error.message ? `${error.message}` : "")
      );
    }
  };

  const handlesetPoll = async () => {
    if (!ballotContract) {
      window.alert("먼저 배포해주세요~");
      return;
    }
    try {
      const setPollResponse = await ballotContract.setPoll(eventName);
      const res = await ballotContract.getPoll(
        setPollResponse.value.toNumber()
      );
      console.log(res);
      await ballotContract.deployed();
    } catch (error) {
      window.alert(
        "Error: " + (error && error.message ? `${error.message}` : "")
      );
    }
  };

  const handlesetTeam = async () => {
    if (!ballotContract) {
      window.alert("먼저 배포해주세요~");
      return;
    }
    try {
      await ballotContract.setTeam(teamName);
      const res = await ballotContract.getTeam(1);
      console.log(res);
      await ballotContract.deployed();
    } catch (error) {
      window.alert(
        "Error: " + (error && error.message ? `${error.message}` : "")
      );
    }
  };

  return (
    <Flex w={"100%"} justify="center">
      <Flex maxW={"1024px"} direction={"column"} gap={"20px"}>
        <strong>Contract address</strong>
        <div>
          {ballotContractAddr
            ? ballotContractAddr
            : "컨트랙트가 배포 되지 않았습니다."}{" "}
        </div>
        <Flex direction={"column"} gap={"10px"} minW={"600px"}>
          <Input
            placeholder="과목명"
            onChange={(e) => setLectureName(e.target.value)}
            value={lectureName}
          />
          <Input
            placeholder="팀장이름"
            onChange={(e) => setTeamLeaderName(e.target.value)}
            value={teamLeaderName}
          />

          <Input
            placeholder="토큰"
            type="number"
            onChange={(e) => setTokenAmount(Number(e.target.value))}
            value={tokenAmount}
          />
          <Button
            disabled={!active || ballotContract ? true : false}
            onClick={handleDeployContract}
            colorScheme={"blue"}
          >
            Deploy Ballot Contract
          </Button>
        </Flex>

        <Flex direction={"column"} gap={"20px"} w={"100%"}>
          <Input
            placeholder="팀원이름"
            onChange={(e) => setMemberName(e.target.value)}
            value={memberName}
          />
          <Input
            placeholder="지갑주소"
            onChange={(e) => setMemberAddress(e.target.value)}
            value={memberAddress}
          />
          <Flex w={"600px"} gap={"10px"}>
            <Button w={"100%"} onClick={handleAddMember}>
              맴버 추가
            </Button>
            <Button w={"100%"} onClick={handlesetUser}>
              멤버 확인
            </Button>
          </Flex>
        </Flex>
        <Flex gap={"10px"}>
          <Input
            placeholder="안건명"
            onChange={(e) => setEventName(e.target.value)}
            value={eventName}
          />

          <Button colorScheme={"blue"} onClick={handlesetPoll}>
            안건 등록
          </Button>
        </Flex>
        {/* <div>
          <input
            placeholder="안건에 걸린 토큰"
            onChange={(e) => setEventToken(e.target.value)}
            value={eventToken}
          />
          <button onClick={handlesetToken}>안건에 토큰 등록</button>
        </div> */}
        <Flex gap={"10px"}>
          <Input
            placeholder="팀명"
            onChange={(e) => setTeamName(e.target.value)}
            value={teamName}
          />
          <Button colorScheme={"blue"} onClick={handlesetTeam}>
            팀명 등록
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
}
