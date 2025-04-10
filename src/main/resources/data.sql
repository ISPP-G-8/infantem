-- Inserción de roles
INSERT INTO authorities (id, authority) VALUES (1, 'user'), (2, 'admin');

-- Inserción de usuarios con contraseñas encriptadas
-- La contraseña que se ha codificado es: user

INSERT INTO user_table (name, surname, username, password, email, profile_photo, authority_id) VALUES
('user', 'user', 'user1', '$2a$10$quXOAFytwj43GJuecSaM7.nrieG6RG4GVUZASDEefCcEfzk.lPMo6', 'user1@example.com', '', 1),
('user', 'user', 'user2', '$2a$10$quXOAFytwj43GJuecSaM7.nrieG6RG4GVUZASDEefCcEfzk.lPMo6', 'user2@example.com', '', 1),
('admin', 'admin', 'admin1', '$2a$10$quXOAFytwj43GJuecSaM7.nrieG6RG4GVUZASDEefCcEfzk.lPMo6', 'admin1@example.com', '', 2),
('Ana', 'García', 'anagarcia', '$2a$10$quXOAFytwj43GJuecSaM7.nrieG6RG4GVUZASDEefCcEfzk.lPMo6', 'ana.garcia@email.com', '', 1),
('Carlos', 'Pérez', 'carlosperez', '$2a$10$quXOAFytwj43GJuecSaM7.nrieG6RG4GVUZASDEefCcEfzk.lPMo6', 'carlos.perez@email.com', '', 1),
('Laura', 'Martínez', 'lauramartinez', '$2a$10$quXOAFytwj43GJuecSaM7.nrieG6RG4GVUZASDEefCcEfzk.lPMo6', 'laura.martinez@email.com', '', 1),
('Javier', 'Sánchez', 'javiersanchez', '$2a$10$quXOAFytwj43GJuecSaM7.nrieG6RG4GVUZASDEefCcEfzk.lPMo6', 'javier.sanchez@email.com', '', 1),
('Sofía', 'Rodríguez', 'sofiarodriguez', '$2a$10$quXOAFytwj43GJuecSaM7.nrieG6RG4GVUZASDEefCcEfzk.lPMo6', 'sofia.rodriguez@email.com', '', 1),
('Miguel', 'López', 'miguelopez', '$2a$10$quXOAFytwj43GJuecSaM7.nrieG6RG4GVUZASDEefCcEfzk.lPMo6', 'miguel.lopez@email.com', '', 1),
('Elena', 'Fernández', 'elenafernandez', '$2a$10$quXOAFytwj43GJuecSaM7.nrieG6RG4GVUZASDEefCcEfzk.lPMo6', 'elena.fernandez@email.com', '', 1),
('David', 'González', 'davidgonzalez', '$2a$10$quXOAFytwj43GJuecSaM7.nrieG6RG4GVUZASDEefCcEfzk.lPMo6', 'david.gonzalez@email.com', '', 1),
('Isabel', 'Ruiz', 'isabelruiz', '$2a$10$quXOAFytwj43GJuecSaM7.nrieG6RG4GVUZASDEefCcEfzk.lPMo6', 'isabel.ruiz@email.com', '', 1),
('Pablo', 'Jiménez', 'pablojimenez', '$2a$10$quXOAFytwj43GJuecSaM7.nrieG6RG4GVUZASDEefCcEfzk.lPMo6', 'pablo.jimenez@email.com', '', 1),
('Marta', 'Díaz', 'martadiaz', '$2a$10$quXOAFytwj43GJuecSaM7.nrieG6RG4GVUZASDEefCcEfzk.lPMo6', 'marta.diaz@email.com', '', 1),
('Sergio', 'Álvarez', 'sergioalvarez', '$2a$10$quXOAFytwj43GJuecSaM7.nrieG6RG4GVUZASDEefCcEfzk.lPMo6', 'sergio.alvarez@email.com', '', 1),
-- Si ves este tochaco no te asustes, es una imagen en hexadecimal
('Antonio', 'Jiménez', 'antoniojimenez', '$2a$10$quXOAFytwj43GJuecSaM7.nrieG6RG4GVUZASDEefCcEfzk.lPMo6', 'antonio.jimenez@gmail.com', 0x89504e470d0a1a0a0000000d49484452000000d9000000d308030000003bfb4622000000206348524d00007a26000080840000fa00000080e8000075300000ea6000003a98000017709cba513c00000039504c5445d2c9bfccb9b0cab5abd8cfc6ffffffedf9fee2ebf1ccbeb6b7a198b3968cc1afa792746a725e58918884584c4a413c3e323033aa8679211f20889285fe00000001624b4744048f68d9510000000774494d4507e9040a082432508e47d0000000016f724e5401cfa2779a000022da4944415478dabd5d8942b3bc120d50852c04e8fb3fec4d664fa07eddfe8b5aad56e57066ce4c2693e0dcb78f619c6e2f1c3ff851df7fcae3cf9fc7efa3f7dfdffad11cef2398e0cd4d133fa5631eddef4bb86e3ff476636837f3d1e27a88eda742fbb100ddfc3eb0c909b889a04def9146f018e325ae4bd27e2ba21f0165a17dce19629ce83bf518e7e7496b0cd23cf0f10c3c7e68b155f3790f177d9e049f802da4fdbc044d3c4dcc12a9bb9db13db046e54fb07dc8191eae35c7974933e8f88179bb9494335716d7ef679ca9804c648d1311388188bc4a9ac1c7ce2672727b84cd08883546fcfc3e674c9933bc4da82a6e185e12914e4ec8246f2a2397d8583d0c7b8d35ceaf9326022fc628d888c00f48fbb9b561e01adbaf8d02bfa4f9aa23f5f1333f13039c9440b0c7b749bbf56aa201e076c99bd0f5a3110068fbc41a0d16391c89e47b227276b7db435857cacf5f0367f33b0a3211b4ced314a39b3f20cd7227b4fda8659ee05da2fb8033b1c5a9a30da81b3e24cd10f70094c0f839cb7ff9c65b9a4fc9c6343967f158879b0a696f2bbf92662df23265fe55ff3219e4cfcf5bf1ac9346d71026041611f90669b7ce1e1f5864431d627d09976262d21e3086faf87eb86e0df204ee2c8fd61c19d96ba44d0d4077e165fae40b2222e09a3cf2b1fcdb10f05e7235690adc453243e1774823a3a4645250dd5a63ec92c9fa819cbd619212a8398cfd57a4d9a4e4e78cab0bd93f92f4bfc2127f921c71e298e6ae58aba47d2e22374926db44f92ae16a1492acf119d2a6ee9350e55a5f730af473e5efecf171d06e4276e5cdbd8c4b0a04d60aadaf9963fe42b86eb13d0ada67e6de508fc9c6e833694d3af235d26e9df637c3ee0bd2c81a9fe06c52c678a4c92ee61ad2a6ff883453bdbbfdcd58cbd953e2683ccc7895eaa341f4cb4fe609a3cbed3bdc3579e4038c14d09e1f7936ca61ddca5d389898e6e29730c08f6b90f91c96b266ecf20ceb453f3339d555fc6a13c8f28a79f131c111d718d775091330f809401bd92ea2b65191174c515cad0164231a1cc330949c31840a2be7bc6d5b79cc0470f54be1b0e0fbc4dffe48238d3cbe449944eb0694518ff2b3658debe2d7754d05d7568121b644e0eab1fa30bdcd9c96470c711745c9e7389b6c0e720e5dc60e978a00c82a580456c6e784aec22ba639bf49dd8fbc3f2c6d19ce9e4e1ca789079da7b10b943feac9571b043b0453c42f11e3961b7485bab782820dd90f05b215be7f19a2bb14427a3e8f63a88a013668c06cedc14e07e8d6e05e8de53f2725f969d36582f6046193f9706d91b1196afa729e62817b0b479fa2a424a16e5d5f27ce94117e6e8f34f2392f6b469b17725f7f1aca79ae0a65dfb70edd6668cc0aaefadccb1ea7d81ea6c84fcba28e5d9a2484b5df0d474a5b5260a21d609b7c00283555c217d7f9bdd99b16d2adb5c627b56362ede8ab55f8791e7d39454675276236551241441f0c8f24650d2febe44f3766eb27139f97c5c98ca1bb54aafc91a5688701d62888385d565c1b09280584e4df1814f423ed96b77f0b0853664953c9a769a5c16774ae826befbc0a15646719c94c2803abdf4cebfc0667dda0ed76e26cfe57563c2920e6ad4d11438874fa3b7a18391a41e9a4246b34a0105e7d2dbc379b788674b30af24f5cd24660934462719ec30a410cd0ecac8c5792289c59e3a400b7be01adcdfd5b8c84ec99b1e7a4d37f9a2cd65f1d239f6de56c23b957d5cf64a717e18db485a0bd29fd9de6df5a05f90bdad464fa36098663581917381982e839dbf7169ca0262581b8f65e11efc76aa4a6c97cf6ff62cd744888d8d76fcc05589693bfc3bb052660f6fbbd238e3963798cafab8825aecd8f6f461be7bf6169f5433dac5c8f79581299e0bd9cfb9d00284b4216813e39a0887f8acb7b459366c82661cd9cffdfac4d5cb0a2bcbef2556435f8b8d553de3a1c1b82c1387037583782b989f823713560af6f95cbbbb6a6decffe84c6c6d754e2403b4a80cedbfd2e28d01cb70d99abcfe0ab3b637aa09999322dff6eb99c2b4882ebd6e68d7f406b2a7128f6b526b06623f100e1be33943b99e67d6f446517f7db2592f300e0bda066bb1054f909cf8cf3160fa069ed541260b810155866174392180b7d67b3766ae59ee2bacd4ab66a8f6f575e8d4d5e70f698b566e8c268511577d6061410f9b437019b7189d7c93bab48fd94a27fbbf2da178e7b2cf32360a73056b2e0441930d960457517606287929670de75d24834c68aeff570ddf9dab59f3d9c95e10aa333b826b7443867c22388e849231bbbe45c82b24d49a472f26eb8d62e3466ed0ce3016b328021910460804c0e3449f99250c993adc38830b36490908e7c425acbdabf545160197d84ef8c288b9bb024bcddd9cd36f1ba3b076b85c622490f3c4a2dc8de577e9361dd9eaa161049ce8c649cab4e664862607705266a79bfb3f2b36932506390e8663511f9700a5855df68fd4365d469406ef41b4a7e4f51ebe2d8513005ab60e358c0d82459a1f4b8a4fc6fa658379b6555d22e1d6cbec2658ac1a88b14bb2e6071985603dd0d6f26fda74020411b4a221f75d9296bff7632b442d17b0216d376a7887cc26535528c94ddcd866b84b56be483cab9fbd41499b37fe58d9329cab1349641743a9dbf7ada7eb77ce9a3610cc7aa8634cc91eb0874f9789aed76adfa8f3c8deb1fe5d950136139e513b6fd0c761760bb8ebabbe464076425587f38014cac71d6f8cf41b549ad86327489db23641dc8ddc0bab3e6107bd9c2abdf81c14cfcc41cb513f9293773cdc86c0e4741d64a9f2548bebfcb7313b879cc563e72eec504cc317ed8d44493bed6c52e5348e363a4fcc1fb75dd1eb124d876f5431bc604d78e49079750485800d967d608e850f51f93667f22c6e89765c181f489333a7f51783544cd87355e731d35935e12b4387c8c0b39fb9793394942d0d38625788a662db01d32db9c74b866f27d550d1999628d20e7cd02dbbe208e68918f396abe63c66743589675cb2717db49b453a664b7ad8b98440aa0218a2cb3d984ad06b44fc511b1fd5db252cd9714a46a7e1d4b770923e18a29c66485c1e61c1cc890b19c49e5932a4911c6cfb210638fffd6c5b9ab78176d1cd3d62343df8703e773bb49dc6cbf828c39c3eb685e977f0c40bf80ecf65caeefcc2c45256d0c3d3270991805594a3aed6e528e8d0661504b26449050096f40da3a7f01d9edb986d466eeb6785a825a9c31c58c8c1de52d52df4e36d247339f3c6906f12b82ed269990c72168fde5f8c1e0d320fb533f3a7434fa9ceb447bd65c1e2e351c47398838c697742697879719dc8c5e16138243d0f51762fc82383e6d8d8d3ac2e02cedd6c710978516893c66c4cc70d6425e4258e6751cb5d31afdb739fb5b246dedcae73dedd61699303ca281c7bd1f39a31256a47c29885c7e21a68e694dff3f643cd134713db54848de55efd1c700517718fe5008e1a35e8903deed8181b0dae797903ddddd682704e3c649c8be19ca7c7dc7b713b672e2897d2b32b5f463521e10c7f56bc89e04260b0f26246d972ac076c19887a38597aa6aa4d81aee71c833e2f5ffcb99aca99051da9279a84c2a47e7e70f8244d83c232eace44d5ee985df0663c2d9a6af71f674b38b2988cc912b8d1b0532e24a20c921679eb6248c1edd8fe12b0cd95f44363d834ae483be0c99c6611bba0961a39336f88c60a6cd986afde1411f9e916122f98d78f6ac9fd99223825b781c962490a185a1a199f35545895b3c1a3ac95ee542446ceffc16b2f909de6421b884ec90b1a4518db1550fb54d06c5bcc59cd50611145e0cfe664c5826fe3f73d6ae1719481d37d484c8129e44fe2241137cbe9aa357ac62a8ca1998e3f7f3c6bfc5439411672de684d5808c1451c8a2d6b74c197264fd236b4c89d146269702211e802cc5efe4fa4f736626d0eae39c309a653378d1ca2f8683944ce8f2f6b349ae380e2ce5ed006bfccaf8ecd9bc91fd4cd766392c12df33995e964978ad34ee7d42d9466e4d9881dc6a8ed8ecf895b534cf72a6d6c8933209cf1fad11723e6a9a30139f386f2449869a2d973ff68dfa25aa6822679fcc55bf816c6a1be5a0211a66a80b32103de80011445222a621e9c1f269725f2d42e2fcd2c1c83e98677a8fb36695482da866a028030fdb7dd742f7a613653825969a31691dc648d2b973335311174056381ebeb2eee97905b1ad9a905fa1842067d29f4363ff2ced7dd9b2c69648f3f67a012ab4b82c88ec2bd2787b2ab7329c9995b791545fb274a95e99f126f6765334b7c3679987d119268fc8deebbe7a93b3a99db4c0cf1eac0e90258b4ab071c9ad198361d943d759008368b86b455604e43b0bcc5fa5cc1c985f258cc08c4b87ca586d4b76a0d94a7da2d773244c6b38ea77bf23204f70a63b59353ddfe51bb1fa4802654827ba321129c0248ce533c3c05cf288ec2bb9d573d6c89b151837ab0b02978a0c865cd6bb341f11664c02c2acc524e52efd5d1f7cfaa4a9ec756457d218aa0d42a95780112ce33e5c5f3d6488293fa60edba4e84ab00e4bedb9fd8e9b3d1fcfdaa6b2f120addf54cda18481f311779aabcd92392d088d1d4de637d832eb9ff088ec4beb945fe48c079ebe5ee23228a9c8a258992d896b4d1c8095a34223d9df786d05cc07e08b2ab2f03d0179ad92aa39f181d5d00c9c919941862f3319a9a628942e33327fb0136ac3d64ed338d519c7b15cb0357cc7d19e8074e1678cac3c923e503ff1cebd733b2939508ac888b458fb9a0ae68d53cb6d27687e182218e55742f5537491a3993d320ec054f2c5cc83aec8a29035c7222e0419992db6b0a79daa95e592ec886c1cd642b15fdeeb26ee913d1da99b155ab5a45191e5c4c53874359546caa9ea991a6b3cba1886972203b91599c7d77f05d9d394d9d9c16929c860f492b84c258118052fe27c1106330fdab8903ae2dc92c92ff13b84acbee25b159ee961567c3151cd9955c916aa7b2546a684286752ab03640b951e39f5b2990bbe6c09c352584ec77f550799ae9eb64bb3a61990794f7e24a1b89937b285a985231a836bf22bc21f8670f86fa5c416c0d4d3a7eb8d9b8c1124242628b34965b82d7453cd980a57888bac51b1c945e03f1086b1363e7d2771e4014a47d874e2afc9adaaa3c1e825c79694660e822ba6fa53a9e2dbfad521af09c350901d5fe84e6aadd16e8f64705d6c55503ecd3078c99998a9a7bed882b629de7be58c90719598abc8f092ba93489190f2cd2f8dcf3acfeab5446ba8ddfa4eafc8e4ec151c9dabfd923ccda0e61fe2cf08d9727c6b7c66b6dc6df600e93791b37d13f57d39a02b40ac11cf8d720da470694e5fcd117e812ec3c207221bcb37bf363e9b1aaedacd9f2e545f36d8396ad16213ce0416815a145ac3a492c6af5f985144b67cc7cd6e96155df268e9b3d26854c4d56096b289675e2f7f679746f6fd61488323e085a8df4064df1e9fb5a4f501c04c9c49ea88332755c75b635ce83c99a286b81e5a609eebd330067f2cdf1a53cf8d1c9eac50fccf92e618190f3f2e9079239527d947356db1016765a81edc97b4318456347447bc56239b68563fd1b47294c9693e4da31f32fb49ea67221abb26003bf05918cb57e3f49d7df60ab2303408a4a0d3c46d5bfba6580da4e568553f9468cbbc71cc1258242e9486e8afd4df62cecaa7617a799b9787c84298edf61fcd9e34a788669262288524a5c0622272bc8ece5859704ad0fc46f0fcc3301637837ffc35644c1b4f68b62b61fa122ac21ee1c42b3275a57a9ade20136001cf1fa7ff9a79ce85024425ad20f30b5ccf2fd82321b3b4f13a2c67c05decb3e6e0cc736b8ee583f3451e92c2d9071209cfd5100d6af28e9c79fcf39fdba320ab4a62eedc60e2d9d43899920684a44d32f54593479314336b26542334936649b82e839885fec3379115da647eddaee66f162218d6967a6a718b4da8564be4911b0fbafda123011d6d1a932c795580bde7a6afd8a34506d8b4f2a6cbcdfacc8af2ab7aa6b116f6d9cf4c3ecf7d135408e0914bdd428f66657894a03971417684812fe1a7f6e8961e9addbaa56bfe33a43924cda3386ad64e418cce1cab907b92398bb469d766d30a4294d738cdffe8536475f341c064b13555d373154492e2e231b52ee71b68646d52ecae8564ae57c13468b4f628ed4a4b8d85475057fed01e0bb27565095125b9d279b548fef0ad84a878804250b5bb9d308ccda435bb22fd6e0919b3f98f9fd923205bbde2aadc350adf2756462707b0af684c4a70f1b8399ab6250bccb226bf1f4419bf608faeeeecb6b24932b8b9910bd7a2325fce5e9a1645d135c550cbe4ad376332ad2f8db6b03d3676f2913dbaead18a6da687f9346ad1b9ce06a0f339b1ac4bb3df71789e57b20548edd889069a17832cc8e606d947f6e8705e6135ee86f02ef6d6b46c89c7b99824704977ad30c6557c5ee5b4a9365ad684b7deb93f44067b3c006d2293f3ccd85c07a89ffc9c56a95fd9d4838061e7004d61c8b21ed35dc1ed74a89061eaa07d608f8e774448222548dacc01c0b586d808647d0c34f894b6c5c8e3665ab025eb897981d30e0c6641a689d8ac97cc7d6a8f6ee3b693aceee62a67f5ed4aff7b29713843a43db55abec75e9e9d96ccc11c2ef590a52c8d4b871873cd863b89fac01e9d591ba652328340d6774e385ceb5de6dfbb28ed03dea485b4f68ad7a7665e1b43cd71b8579b764002b0e57ce1deb747c7bb73e06a9b882639cc2492b3e424faefba8cc4ad72769808eb42265d7e251bdb62fb0e22832641be2a30cbd46930a479efdaa32353e4856224256128e08a3556c3bc88d68d8d7aedab1599a72d08b88da2695f42bc9b90a659cb45a3d0fbf6e864551f633311c0914db6234ee3e3f03e72cbd881432f5aff97fbbccace40d12cfc469c6142b2747f9abffe10d92652822659689b454a2e366d345755a2af05b65d0153d2d81a85b2c4c6d827e0ee4d5733c8109b354960cc116d3d38fdca674646a179e315c8168fe961cab2432c2103cefdf96f7f22fd8a4c360bdb045bd510c7e84eb554f932d8940904519b382ff9aaed63bc7a5556e1c100864785dd14ebc79c6d5b6eddcd833c16c648497a937412d138d3256be47d4c245fd4bd5e25ef377d49f0cb733b94b7b323efd86387ecc2dd24b60577a58cf5280956e27c02b79ecf4927a269714252f026b7d2296b6b8cba469106bf6f4073db797f4c5d4b0a2659954403c0d511329f267756354d03323b7d688944001e34668b83f5acaeccf98eab9d39a3f5cf9a4ca2493a7cbbf2344843923951ee38e0b531ba8cceaea4333d2195b289cb2e32896c129e375ced02990d6f886dc16c040e3302d0399a455b318fa8f333c7f9b00b2e92b5c6b1b964ced9b8e6de7135872b5964b7047d94e5f614b841222bbc0b9374325ea6a0db540f7a44953deeab66604737ef2813928cf1e52ccb6d27376374ad948841cea18306b59e946cef4ab3a8cc0b3659da44d6288dc64819ef130998663b73f78eab395e7ef4d0dd185b4d4aaafcbbf9a42498f01be3b2ab22098c0a8a28083514272b8cb2f7d4186cc7c61baee6f66b5c7d0860777355218b4d7632e2822a222cdfb1cbe64c3b92a9a2c694254f59670d8e94600d3572b7dd0eafb99adbfe75d00e84094d12b0953713b7f1ab98a3e6f4870e45cdfa03ec6b64eea206b9b838658c2697e7e390a92f8e722f41937876b5e96cc31b98244400cc24e736d90abcf582f40eeb2034f376343800300b64287c8f4e35912782ea8c75d343f4a2ab398be89159323630491cb8cd2c92e22031732e28e9b12083055d8c4c6b09b46826150f9e2c69702c4be867ca5f7235527d01b5377475fcb149a246ceb34cf23a4844322f03410da1b13227f7da0a2e5548dad1651d86d9ce85203ca80cda860080fe9a353e202c5f618be26e01b683b1f2b8f15d2b5212d23c960ff8bbd2034fc8c02d97994ddb34704c03d4734db70dfc9be75dcd59cafe1049dd1e1f234045050f9a927b325b28bad979411c0098b2b7d67f2ab223ccc32cd159b00832bb4bda0b01fbdfdaa8945a29596a9eec28ddc2ffbaa45daa6e04c363ba515b6875a13cc962ce3cf40cf52655a28be268dace616e8bfabc8a38bac344b3f17187e82c259187a578ab0874b6e5c8771e2c47583aad6ba9ed361b5802cab4c766f9661190c1b6ea09b2d1364789717cc259eeb0ed3d3690128f2689fd4d535d2b136191232e2dc00940e91c3e78152bb918fd35901ab446db61d323b35d44cf4233daf820ac6df20ada4038cb20a098648ddb33622bb135d2968638f6441cbaef902cb933e5d5fab3e0481c9b267a370623fbb6c5f23915f9b79f5d8470c4165125c122217fad03138406bc6b1e2fb86044407f16f6a104090d6325cdf5e6a8e2682376fd78cad55c6e00d85b676c4d94bbf037743735c96a7b19971d6f39ebca3a59c8450eb6f3beafd8ab5bb471c44bd352d42133d2ff1434676fe9f54fd6f60b6c1e035b21ce43af01ada9a61b1d5041951e683532bb2ecd968e5381a642c128e6b6d7cd18e453d0dc43542732f7ad218ff78d2fee469e0e72818bfeed16b6890a023c8346377ee0854ec7517f7dbcd832a79390664cf36f68cedc1bea918228aa0b7f2329a91ba82cb8a609f7d0d3ddca750510ed5a4f3b47cb045370d7478fcce4fd4f4073769fbe4bb3343769e836fccf848ddccd0514f87cd72d95779a533213307c4f199d140c0f96e534e2c802333d1bd61cafc8b4774bba06b79f3d8e7e8bdc6da0a89ccd96a9f2b294f89e54b05670cbb2c98d7fc4d9d84808f3f76c5873bcdf005367c0e50edb2ef83a25c9e86e81738c4db6b985141f3523f18d21e0fbd914239f43b62c40d9fcac413ad9135ea607e53e579bd9c49a02f5851bf2f684059b944a37d946e34e3743db71af4dbed943b32fd1f26095582b8e0b8cb1a7a029f8df11db6d721f973dab596aa15848d38067ef88c277c3026852a38a49f7ff6ef6f6a6bda2313fe65d8896079ccd8d840cbe3e99461ca522be7f73469aa57702d9642f49034fef6563c37a568da0ca4e3de96476aee428201879c78283397b06d90c63ec691ec27329a4936dc637feac7708b45b21377bc7ab5df2cd4813e7c09c00e336f577be29897829eff6a8db011efed1f66fa11147ae1e8c6a8f7f19a4530f92dbd6b08165d9e6b3bda79ea909c96b130d37edbac04c5e6575926b3acde681cf4948406e275b7ff9638c2d0ad26d394e71a8692bb2c2df4a4979ad74c1791eb468562f426be7ae0db8657c88cc48c8b8c818db94c97f1f23d38dfbcdad4f68b77b6d7630c160d73df18d57ea54b54c2571a151331105156db1df2f979b57cf632b2135d3e9d7c33d36482786227ed010a77396c61c7bce4c2d8eab3a324166d6579bc9c0169cefe591800e1d3209d6cde4daef636b944de077d2bf137172ffd44e43f61e9add4934dad6c6d4a2d2290c66cd5d609b83ad39cee649537aff7dc81925dfa75df0d5e392dc78b34d2649eca8a2210554cf618d276dbb2e837edaa95e8e7ad63400955b1f427faceefd2f4a3974d3ca97d05ccc9c16989b28f5f030725bda5acea49a7898a67c5291b69398998a4c5a14831c8f1497c17256e430984df203bb633073da0fa1d54de5d74877eb31f00c34da96caba554f5de3683a41763a74afb2d61891b8948f05c5904993153b707fb691704f839fbb76d20b685032f4bc1d1a8d3f4ec0e4ae65a7c18004ecc4fb2ff064606ca01d46e58d2e2a3cc85d9620110cb8ea659f256419a6d6d52ea04175c6c3e61edbba26d9384d0c5237c1d3da4d431d6193a6887697cd86a9a3c1255b73aaa4d466afd1ecb13e8c551cb1186125248c76bdd5f47b05ad7aedbcc01e1d9b5f0e995e108bbc37b7a4e8c09923e992105e01deea84ee127b58ce045d79c766df916fe43b5f668e8eb544397357631ab2c6ba31500664a4d472df3c41656fd7a3e0a4a1f520762c65c6e2ae2146e370c516a9b57e1e44474cfd6a96fcaa2627edd662eef70ccdd5c9e77ac7af628d1599ee3196b7c45b6037acd178df3297a28f59764b950db2fd714593c1679fc2d649c8d93c94a10a91368f83deee4bc4715e78aede5a6487ac5e23f0b3bd7066fd3da7a5c866b237c26aee6b2637e9c9c5f18f8dd229bb67edbf0fddc918764e2264f0300cfdbd61551c8b8460835b704259f9f8ed91cd74c30db646e62c55295a3256ea79b345bc7b8ab008bbc10d759faaa385e62fb0750d14f18ab1f2302e086d24e64441ac38c228745a962664ff9c385b71247fe2acf8f2525533d63b4ced9b01c737bcd96228fa150e0286dbee680ff8bf886388a8f781281b81b5a1401b4d52329f24c44dc1b44b557bfc69fccc70e64d4f9e705630c7bad75af9f19adb1b5a6e256718ea85a61132a5843d695e08b35b650b67515451c0556c638556def5c64ab3221b719dc4bc3823fcadf4d79e9c1015199994b1c6c2590264c5c87dddd38aa3c29696012fef92cc9a25ea946614b687ffd2cfeaf508ec63cc1ab9da58691be699456459484c860573fea5ed95b5a335e00cef1948c82c67209bf73d2d84ac7a5d5efc5a53dc7581ff5ccf81374c6675f4c7033fbb50c9d813262a524195773846b4c7c012325709a956390bacdfaa23bf6a8f10cf9833e367c0599867e56c036419e6cbf1a8ff11cec30e91a933e9197dc4dff0cb152cb449c6c50e175042e69a5fc128b4262322912d6995b339c28eac67ce4a94043f03ce2ab2b08e307fcbb8c818b92b87b9bb9446df83c24fac882763acc804db40361906f23984380d20213caaf9b59e06e5ca08bbc135c80a6719b5b1b089c8fc60c8425c7475a3298b465e9ad4a1307bd11bb48b8555441d113167449be2c3197fcdaf1c36eed936b05fabfae10259dd5e0d39ab6b6bc11a3d725571cd888cce684926098cdc28d776959dec1326a83bbe4624cae0e2433d8e22f840891602a4a5cabfce225bfdb2c016d0884c078a5b563f837d2546671903ca8433930a1a642c265ee1298d4b38d921ea3dfe59c003ff8288e40b4adc51ccc65d092a3237b799b1abd35f29c3f04516ae0832ca410ab2e847830a908943045c36a8a985ef49330d9c44d782a09696b391a80af46688c384ab75bb2a21d5c7a0b83acd28904c5abdb79ecfdb71b47bbd25e24c90f9b90e77e6fab71b370374b8099baa42bb7bcbc1f7b310f22e645e244340056b8b7825e57fb3b7d56278e5696064461d5ddd0b216f2b2639d89687e0f65cbb500959b00e26b638a26bc026a0a20d6699a7dca5c212c8b0bab463215c7cbde460f52fb619e8ffcf6d79129b8d275ee1a2c88a02d0fe9232610ed6b81d251603b2383891c5b94146aee673e28de468c721d2477fd8d584c775f01a493a3ab206110f51ff30d843c7030ccf8a632d0f8595eee3922c6779cf6b55907d5b6701d6eac7280aad0b36bdaea666f712afbbb4c246032d51239ffea03669025cebf6d29b201202d618135e546d7fa52e15bf14171a0d2efe6b7441c3c83aa24b226997286f5c0c574b5f3b172651f0f77a888289396cd83a9d12378009320fc8e09c6463f54a596d6ff3ebba3805266e368ae88f1d6b5e9019500f5135c0f84a5d92a8a04c6c6bce09995373acc87cc4cd748c3526b839d4017d8c02abfe15e54caf27e6af071b2497e674ab9a0e4b4d3530df206206b100eb60f465eb59f04382d14481014fad62fbe148bd2650104086c648b7b42aa38bb9b5441590815d7bd45444b377dab771b9e66a2c892d3c343042b0fcf0e388705add18ac4a37f17b86b63bc8f85dbd696a6e152426ba01c5323796288cd1c5c3ff6cb08585c982fd92fe30c15a12305846d51173f66303851913343d67ec7b80ade620706028aafd5e78c34628a4c68eb1417361f9e7e4fb81b53bfc8567117a6bf8d25c8ac218dbe6c812d5d365f4ff7460f635c340a462fb71585ec4bc8fefac86bdcb7168f91aba3c7f64736968fb131ac25bc4a7421795c796adce00d93899af59b86b49c38e7b5a8584ee81cdd8b407720af3f9a02c5fa009c060d2c8876455504162c568124343073ff25bcb5827ff97f648edcd6b2c197134c8680636f9f9eab0ff6468009244fe4596000a36e9d5a1738b84f819ed537df12c1f266033610ed749b890a2379c611be23af7ba68e483dd41c46d1824233186c95cc9888bfd2904258efd692441b45c893f1b07ef4842aba45f20cab071bb44b3156688605372e12c0df39f9ce97f199b4461b4583811445c1284d9b118d7954b294b06a05198de1439168831ce759e3af12223d2c62afe8bbc66b64262fe0ed9bb21cc2838cb9de2ebe030db9776d8eb8798fed58ff1b4381a28054e6fa1a4ebd65326277b10a7e5ca89d72b2306a1026a075c41518dd693ae30a9158ef6ff0e2715e9a00d8cccde91b9c6810b5836b736a736f4c6c84ea4302f4cb083249e3b366ea5fe7cb6d58b5027c8e0f7ff07d295f311420fbbf50000002574455874646174653a63726561746500323032352d30342d31305430383a33363a34342b30303a30309721b8510000002574455874646174653a6d6f6469667900323032352d30342d31305430383a33363a34342b30303a3030e67c00ed0000002874455874646174653a74696d657374616d7000323032352d30342d31305430383a33363a35302b30303a3030898c05bf0000000049454e44ae426082, 1);

-- Inserción de alérgenos
INSERT INTO allergen (name, description) VALUES
('Gluten', 'Presente en trigo, cebada, centeno y sus derivados.'),
('Lactosa', 'Azúcar presente en la leche y productos lácteos.'),
('Frutos secos', 'Incluye almendras, avellanas, nueces, anacardos, pistachos, etc.'),
('Huevo', 'Puede encontrarse en salsas, repostería y productos procesados.'),
('Mariscos', 'Incluye gambas, langostinos, cangrejos, y otros crustáceos.'),
('Pescado', 'Presente en alimentos procesados como caldos y salsas.'),
('Soja', 'Se encuentra en productos como salsa de soja, tofu y alimentos procesados.'),
('Mostaza', 'Ingrediente común en salsas y condimentos.'),
('Sésamo', 'Presente en panes, galletas, tahini y otros productos.'),
('Sulfitos', 'Utilizados como conservantes en vinos, frutas secas y productos procesados.');

-- Inserción de bebés
INSERT INTO baby_table (name, birth_date, genre, weight, height, head_circumference, food_preference) VALUES
('Juan', '2023-01-01', 'MALE', 3.5, 49, 35, 'Leche'),
('María', '2023-02-01', 'FEMALE', 3.2, 48, 34, 'Leche'),
('Alicia', '2023-03-01', 'FEMALE', 3.8, 36, 36, 'Leche'),
('Bruno', '2023-04-01', 'MALE', 3.6, 41, 35, 'Leche'),
('Carlos', '2023-05-01', 'MALE', 3.4, 49, 34, 'Leche'),
('Luffy', '2022-03-20', 'MALE', 3.4, 49, 34, 'Carne'),
('Nami', '2024-01-02', 'FEMALE', 3.4, 49, 34, 'Dinero'),
('Chopper', '2025-04-01', 'OTHER', 3.5, 51, 35, 'Algodón de azucar');

-- Inserción de relaciones entre bebés y alérgenos
INSERT INTO baby_allergen (allergen_id, baby_id) VALUES
(1, 2),
(3, 3),
(4, 4),
(5, 5);

-- Inserción de registros de sueño
INSERT INTO dream_table (baby_id, date_start, date_end, num_wakeups, dream_type) VALUES
(1, '2025-03-03 22:00:00', '2025-03-04 06:30:00', 2, 1),
(1, '2025-03-04 23:15:00', '2025-03-05 07:00:00', 3, 1),
(1, '2025-03-05 21:30:00', '2025-03-06 06:45:00', 1, 2),
(4, '2025-03-06 22:45:00', '2025-03-07 07:30:00', 2, 3),
(5, '2025-03-07 23:00:00', '2025-03-08 07:15:00', 1, 1);

-- Inserción de vacunas
INSERT INTO vaccine_table (type, vaccination_date, baby_id) VALUES
('MMR', '2023-06-01', 1),
('DTaP', '2023-07-01', 2),
('HepB', '2025-03-04', 3),
('Polio', '2023-09-01', 4),
('Hib', '2023-10-01', 5),
('Rotavirus', '2023-11-01', 1),
('PCV', '2025-03-03', 1),
('HepA', '2024-01-01', 1),
('Varicela', '2024-02-01', 4),
('Meningococo', '2024-03-01', 5);


-- Relación entre usuarios y bebés
INSERT INTO user_baby (user_id, baby_id) VALUES
(1, 1), (2, 2), (1,3), (14,6), (14,7), (14,8);

-- Inserción de hitos
INSERT INTO milestone (name, description) VALUES
('Primer paso', 'El bebé da su primer paso sin apoyo.');

-- Inserción de hitos completados
INSERT INTO milestone_completed (baby_id, milestone_id, date) VALUES
(1, 1, '2024-01-01');

-- Inserción de recetas
INSERT INTO recipe_table(max_recommended_age, min_recommended_age, user_id, description, elaboration, ingredients, name, recipe_photo) VALUES
(8, 6, 1, 'Puré de zanahoria y batata', 'Cocinar zanahoria y batata al vapor, triturar.', 'Zanahoria, batata', 'Puré de Zanahoria y Batata', ''),
(7, 5, 2, 'Compota de manzana y pera', 'Cocinar manzana y pera a fuego lento, triturar.', 'Manzana, pera', 'Compota de Manzana y Pera', ''),
(9, 6, 2, 'Puré de aguacate y plátano', 'Triturar aguacate y plátano maduros.', 'Aguacate, plátano', 'Puré de Aguacate y Plátano', ''),
(8, 6, 1, 'Crema de calabaza y calabacín', 'Cocinar calabaza y calabacín al vapor, triturar.', 'Calabaza, calabacín', 'Crema de Calabaza y Calabacín', ''),
(7, 5, 1, 'Puré de guisantes y zanahoria', 'Cocinar guisantes y zanahoria al vapor, triturar.', 'Guisantes, zanahoria', 'Puré de Guisantes y Zanahoria', ''),
(10, 7, 16, 'Puré de pollo con verduras', 'Cocinar pollo y verduras al vapor, triturar.', 'Pollo, verduras mixtas', 'Puré de Pollo con Verduras', ''),
(10, 7, 16, 'Tortilla francesa con espinacas', 'Batir huevo con espinacas cocidas, cocinar.', 'Huevo, espinacas', 'Tortilla con Espinacas', ''),
(12, 8, 16, 'Croquetas de pescado blanco', 'Cocinar pescado, mezclar con puré de patata, formar croquetas y hornear.', 'Pescado blanco, patata', 'Croquetas de Pescado', ''),
(11, 8, null, 'Arroz con pollo y verduras', 'Cocinar arroz, pollo y verduras al vapor, triturar ligeramente.', 'Arroz, pollo, verduras', 'Arroz con Pollo y Verduras', ''),
(9, 7, 1, 'Yogur natural con fruta', 'Mezclar yogur natural con fruta triturada.', 'Yogur natural, fruta', 'Yogur con Fruta', ''),
(8, 6, 2, 'Huevo revuelto con aguacate', 'Revuelto de huevo con aguacate triturado.', 'Huevo, aguacate', 'Revuelto con Aguacate', ''),
(7, 5, 1, 'Puré de lentejas con zanahoria', 'Cocinar lentejas y zanahoria, triturar.', 'Lentejas, zanahoria', 'Puré de Lentejas', ''),
(10, 7, null, 'Pescado blanco al vapor con verduras', 'Cocinar pescado blanco y verduras al vapor.', 'Pescado blanco, verduras', 'Pescado al Vapor', ''),
(12, 9, null, 'Mini hamburguesas de ternera', 'Carne de ternera picada, formar mini hamburguesas y cocinar a la plancha.', 'Ternera picada', 'Mini Hamburguesas', ''),
(11, 8, null, 'Pasta corta con verduras', 'Cocinar pasta corta, mezclar con verduras al vapor y triturar ligeramente.', 'Pasta corta, verduras', 'Pasta con Verduras', ''),
(12, 9, null, 'Mini hamburguesas de ternera', 'Carne de ternera picada, formar mini hamburguesas y cocinar a la plancha.', 'Ternera picada', 'Mini Hamburguesas', ''),
(9, 6, null, 'Cocer brócoli y patata al vapor, triturar hasta obtener una crema suave.', 'Cocer brócoli y patata al vapor, triturar.', 'Brócoli, patata', 'Crema de Brócoli y Patata', ''),
(10, 7, null, 'Cocer calabacín y arroz, triturar hasta conseguir una papilla homogénea.', 'Cocer calabacín y arroz, triturar.', 'Calabacín, arroz', 'Papilla de Calabacín y Arroz', ''),
(11, 8, null, 'Saltear calabaza y lentejas cocidas, triturar para obtener un puré.', 'Cocer calabaza y lentejas, triturar.', 'Calabaza, lentejas', 'Puré de Calabaza y Lentejas', ''),


-- Inserción de anuncios
INSERT INTO advertisement_table(company_name, title, target_url, photo_route, time_seen, total_clicks, max_minutes, is_completed) VALUES 
('Nestlé', 'Papillas de frutas', 'https://google.com', 'a', 0, 0, 1, false),
('Hero', 'Leche de continuación', 'https://google.com', 'a', 0, 0, 1, false),
('Dodot', 'Pañales', 'https://google.com', 'a', 0, 0, 1, false),
('Chicco', 'Biberones', 'https://google.com', 'a', 0, 0, 1, false),
('Suavinex', 'Chupetes', 'https://google.com', 'a', 0, 0, 1, false),
('Johnsons', 'Toallitas húmedas', 'https://google.com', 'a', 0, 0, 1, false),
('Blemil', 'Leche de inicio', 'https://google.com', 'a', 0, 0, 1, false),
('Nutribén', 'Potitos de verduras', 'https://google.com', 'a', 0, 0, 1, false),
('Avent', 'Esterilizador de biberones', 'https://google.com', 'a', 0, 0, 1, false),
('Babymoov', 'Cuna de viaje', 'https://google.com', 'a', 0, 0, 1, false);

INSERT INTO recipe_allergen(allergen_id,recipe_id) VALUES
(1,1),
(2,2),
(3,3),
(4,4),
(5,5);


-- Inserción de síntomas relacionados con las ingestas
INSERT INTO intake_symptom (description, date) VALUES
('El bebé no presentó ningún síntoma.', '2025-03-01 08:00:00'),
('El bebé rechazó la comida ofrecida.', '2025-03-01 12:30:00'),
('El bebé mostró signos de malestar estomacal.', '2025-03-01 18:00:00'),
('El bebé presentó una reacción alérgica leve.', '2025-03-02 08:30:00'),
('El bebé presentó una reacción alérgica severa.', '2025-03-02 13:00:00'),
('El bebé vomitó después de la ingesta.', '2025-03-02 15:00:00'),
('El bebé tuvo diarrea después de la ingesta.', '2025-03-02 18:00:00'),
('El bebé presentó fiebre después de la ingesta.', '2025-03-03 08:00:00'),
('El bebé presentó erupciones en la piel.', '2025-03-03 12:00:00'),
('Otros síntomas no especificados.', '2025-03-03 18:00:00');

-- Inserción de ingestas
INSERT INTO intake_table (date, quantity, observations, baby_id, intake_symptom_id) VALUES
('2025-03-01 08:00:00', 200, 'Desayuno: el bebé comió bien, sin problemas.', 1, 1),
('2025-03-02 08:00:00', 200, 'Desayuno: el bebé comió bien, sin problemas.', 1, 2),
('2025-03-01 18:00:00', 180, 'Merienda: el bebé disfrutó la comida.', 2, 3),
('2025-03-01 18:00:00', 180, 'Merienda: el bebé disfrutó la comida.', 3, 4),
('2025-03-02 13:00:00', 160, 'Almuerzo: el bebé tuvo un poco de malestar.', 4, 5);

-- Relación entre intake y recetas
INSERT INTO intake_recipe (intake_id, recipe_id) VALUES
(1, 1), 
(1, 2), 
(2, 3),        
(3, 4),
(3, 5);


-- Inserción de enfermedades en la tabla disease_table
INSERT INTO disease_table (id, name, start_date, end_date, symptoms, extra_observations, baby_id) VALUES
(1, 'Varicela', '2025-03-01', '2025-03-09', 'Erupción cutánea, fiebre', 'Se recomienda mantener al bebé hidratado.', 1),
(2, 'Gripe', '2025-02-03', '2025-03-02', 'Fiebre, tos, congestión nasal', 'Administrar medicamentos según indicación médica.', 1),
(3, 'Otitis', '2024-01-10', '2025-01-15', 'Dolor de oído, fiebre', 'Evitar exponer al bebé al agua durante el tratamiento.', 1),
(4, 'Bronquitis', '2025-03-05', '2025-03-15', 'Tos persistente, dificultad para respirar', 'Se recomienda usar humidificador.', 2),
(5, 'Conjuntivitis', '2025-03-12', '2025-03-14', 'Ojos rojos, secreción ocular', 'Limpiar los ojos con solución salina.', 2);

-- Inserción de métricas en la tabla metric_table
INSERT INTO metric_table (id, weight, height, head_circumference, arm_circumference, date, baby_id) VALUES
(1, 3.5, 50.0, 35, 10, '2025-04-01', 1),
(2, 4.0, 52.0, 36, 11, '2025-04-02', 1),
(3, 11.0, 91.0, 50.5, 18, '2025-04-03', 1),
(4, 6.0, 60.0, 38, 13, '2025-04-03', 2),
(5, 7.0, 65.0, 39, 14, '2025-04-03', 3),
(6, 14.0, 86.0, 45, 12.7, '2025-04-04', 3),
(7, 9.0, 75.0, 41, 16, '2025-04-03', 4),
(8, 10.0, 80.0, 42, 17, '2025-04-04', 4),
(9, 11.0, 85.0, 43, 18, '2025-04-03', 5),
(10, 12.0, 90.0, 44, 19, '2025-04-04', 5),
(11, 17.0, 100.0, 51, 17.5, '2025-04-04', 6),
(12, 8.0, 73.0, 43.5, 13, '2025-04-05', 7),
(13, 3.5, 51, 35, 12.5, '2025-04-06', 8);

-- Inserción de productos

INSERT INTO product (title, description, image_url, shop_url) VALUES
(
  'Philips Avent SCF033/27 - Biberón Natural 260 ml',
  'Pack de dos biberones con capacidad de 260 ml, sin BPA y con forma ergonómica; enganche natural gracias a la tetina más ancha con forma de pecho.',
  'https://m.media-amazon.com/images/I/41b7U5nfW1L._AC_SL1000_.jpg',
  'https://www.amazon.es/Philips-Avent/dp/B095CBHTT4'
),
(
  'Dodot Sensitive Talla 2 (4-8 kg), 240 pañales',
  'Pañales con suavidad excelente: materiales muy delicados, ideales para pieles sensibles o con tendencia a irritaciones. Alta absorción: buena retención de líquidos.',
  'https://m.media-amazon.com/images/I/81V-dxSVHeL._AC_SL1500_.jpg',
  'https://www.amazon.es/DODOT-Sensitive-Pa%C3%B1ales-Talla-240/dp/B082N3H868'
),
(
  'Hero Baby Tarrito de Verduras con Ternera y Arroz (2x235 g)',
  'Tarrito de verduras con ternera y arroz, sin gluten, adecuado desde los 10 meses.',
  'https://latiendahero.es/cdn/shop/files/8410175081131_VerdurasconArrozyTernera2x235g_L.png?v=1741782192&width=910',
  'https://latiendahero.es/products/tarrito-hero-solo-verdura-ternera-y-arroz'
),
(
  'Dodot Toallitas Pure Aqua (144 uds)',
  'Toallitas con 99% de agua purificada y algodón orgánico, ideales para pieles sensibles.',
  'https://m.media-amazon.com/images/I/71YW6XLg1-L._AC_SL1500_.jpg',
  'https://www.amazon.es/Toallitas-Paquetes-Unidades-Elaboradas-Limpieza/dp/B0B6C21YSN'
),
(
  'Chicco Mordedor Fresh Relax 4m+',
  'Mordedor refrigerante que alivia las encías durante la dentición. Se puede enfriar para mayor alivio.',
  'https://m.media-amazon.com/images/I/61lpDkUDtLL._AC_SL1500_.jpg',
  'https://www.amazon.es/Chicco-Fresh-Relax-4-m/dp/B0891CRC5F'
),
(
  'Carrefour Baby Toallitas Sensitive 6x72 uds',
  'Toallitas con extracto de aloe vera y sin perfume. Testadas dermatológicamente.',
  'https://static.carrefour.es/hd_510x_/img_pim_food/489929_00_1.jpg',
  'https://www.carrefour.es/supermercado/toallitas-bebe-sensitive-my-baby-carrefour-72-ud/R-prod395287/p'
),

(
  'Lictin Pack 2 baberos impermeables con bolsillo',
  'Baberos ajustables de silicona con recogemigas. Fáciles de limpiar y resistentes al uso diario.',
  'https://m.media-amazon.com/images/I/71vX4RWw3PL._AC_SL1500_.jpg',
  'https://www.amazon.es/Lictin-Babero-Mangas-Impermeable-Ajustable/dp/B0BZVLJGQ9'
);

