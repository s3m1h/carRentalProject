import React, { useRef, useEffect, useState } from 'react';
import Swal from 'sweetalert2';

const BallGame = () => {
  const canvasRef = useRef(null);
  const [ballPosition, setBallPosition] = useState({ x: 300, y: 300 });
  const [velocity, setVelocity] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const gravity = 0.5;
  const jumpVelocity = -10;
  const ballSize = 40;
  const wallGap = 200;
  const wallWidth = 50;
  const wallSpeed = 2;
  const backgroundSpeed = 1;
  const backgroundImage = useRef(null);
  const backgroundPosition = useRef(0);
  const walls = useRef([]);
  const [imageLoaded, setImageLoaded] = useState(false);
  const ballImgRef = useRef(null); // Top resmi referansı
  const [score, setScore] = useState(0);

  const [angle, setAngle] = useState(0);
  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth - 350;
    canvas.height = window.innerHeight - 220;

    const context = canvas.getContext('2d');
    const img = new Image();
    img.src = 'background.jpg'; // Arka plan resminizin dosya yolunu buraya girin
    img.onload = () => {
      backgroundImage.current = img;
    };


    const ballImg = new Image();
    ballImg.src = 'hacker.jpg'; // Top resminin dosya yolunu buraya girin
    ballImg.onload = () => {
      setImageLoaded(true); // Resim yüklendiğinde durumu güncelle
      ballImgRef.current = ballImg;
    };
    return () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    const drawBackground = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.drawImage(backgroundImage.current, backgroundPosition.current, 0, canvas.width, canvas.height);
      context.drawImage(backgroundImage.current, backgroundPosition.current + canvas.width, 0, canvas.width, canvas.height);
    };

    const drawWalls = () => {
      context.fillStyle = 'green';
      walls.current.forEach(wall => {
        context.fillRect(wall.x, wall.y, wall.width, wall.height);
      });
    };

    const draw = () => {
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');

      // Transformasyon matrisini sıfırla
      context.setTransform(1, 0, 0, 1, 0, 0);

      context.clearRect(0, 0, canvas.width, canvas.height); // Canvas'ı temizle
      drawBackground();
      drawWalls();
      if (imageLoaded && ballImgRef.current) {
        // Referans üzerinden top resmini çiz
        context.save(); // Mevcut durumu kaydet
        // Dönme merkezini ve açısını ayarla
        context.translate(ballPosition.x + ballSize / 2, ballPosition.y + ballSize / 2);
        context.rotate(angle);
        // Resmi çiz
        context.drawImage(ballImgRef.current, -ballSize / 2, -ballSize / 2, ballSize, ballSize);
        context.restore(); // Önceki durumu geri yükle
      }

    };

    const checkCollision = () => {
      walls.current.forEach(wall => {
        if (
          ballPosition.x + ballSize / 2 >= wall.x &&
          ballPosition.x - ballSize / 2 <= wall.x + wall.width &&
          ballPosition.y + ballSize / 2 >= wall.y &&
          ballPosition.y - ballSize / 2 <= wall.y + wall.height
        ) {
          if (ballPosition.y - ballSize / 2 > wall.y && ballPosition.y + ballSize / 2 < wall.y + wall.height) {
            setGameOver(true);
          }
        }
      });
    };

    const updateGame = () => {
      if (!gameOver) {
        const newVelocity = velocity + gravity;
        const newPosition = {
          x: ballPosition.x,
          y: ballPosition.y + newVelocity
        };

        if (newPosition.y + ballSize / 2 >= canvas.height) {
          newPosition.y = canvas.height - ballSize / 2;
          setGameOver(true);
        }

        setVelocity(newVelocity);
        setBallPosition(newPosition);
        checkCollision();

        // Her güncelleme adımında bir puan ekleyebilirsiniz
        setScore(score + 1);
      }
    };

    const moveBackground = () => {
      backgroundPosition.current -= backgroundSpeed;
      if (backgroundPosition.current <= -canvas.width) {
        backgroundPosition.current = 0;
      }
    };

    const moveWalls = () => {
      walls.current.forEach(wall => {
        wall.x -= wallSpeed;
      });
      if (walls.current.length > 0 && walls.current[0].x + walls.current[0].width < 0) {
        walls.current.shift();
      }
    };

    const generateWalls = () => {
      const numWalls = Math.floor(canvas.height / (wallGap * 2)); // Duvar sayısını hesapla
      let prevGapPosition = canvas.height / 4; // İlk duvar arasındaki boşluğun başlangıç konumu

      for (let i = 0; i < numWalls; i++) {
        const gapPosition = prevGapPosition + Math.random() * (canvas.height / 2 - wallGap * 2); // Rastgele aralıklı duvar oluştur

        // Rastgele üst ve alt duvar yükseklikleri oluştur
        const wall1Height = Math.random() * canvas.height / 2;
        const wall2Height = Math.random() * canvas.height / 2;

        const wall1 = {
          x: canvas.width + Math.random() * 200, // Duvarın x konumu
          y: 0, // Üst duvarın y konumu
          width: wallWidth, // Duvar genişliği
          height: wall1Height // Üst duvarın yüksekliği
        };

        const wall2 = {
          x: canvas.width + Math.random() * 200, // Duvarın x konumu
          y: gapPosition + wallGap * 2, // Alt duvarın y konumu
          width: wallWidth, // Duvar genişliği
          height: wall2Height // Alt duvarın yüksekliği
        };

        walls.current.push(wall1, wall2); // Duvarları listeye ekle
        prevGapPosition = gapPosition; // Bir sonraki duvar arasındaki boşluğun konumunu güncelle
      }
    };

    generateWalls();

    const animationId = requestAnimationFrame(() => {
      draw();
      updateGame();
      moveBackground();
      moveWalls();
    });

    return () => cancelAnimationFrame(animationId);
  }, [ballPosition, velocity, gameOver]);

  const audio = new Audio('sound_effect.mp3');
  const handleCanvasClick = () => {
    if (!gameOver) {
      audio.play();
      setVelocity(jumpVelocity); // Tıkladığınızda top hızlıca yukarı çıkar
      setAngle(angle + Math.PI / 4); // 45 derece dön
    }
  };

  const handleRestart = () => {
    setGameOver(false);
    setBallPosition({ x: 300, y: 300 });
    setVelocity(0);
    setScore(0); // Puanı sıfırla
    walls.current = [];
    generateWalls();
  };

  return (
    <div>
      {gameOver && <button className='btn btn-primary' onClick={handleRestart}>Yeniden Başla</button>}
      <br />
      <div>Puan: {score}</div> {/* Puanı göster */}
      <br />
      <canvas
        ref={canvasRef}
        style={{ cursor: 'pointer' }}
        onClick={handleCanvasClick}
      ></canvas>
    </div>
  );
};

export default BallGame;
