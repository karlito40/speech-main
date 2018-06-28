SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `speech`
--

-- --------------------------------------------------------

--
-- Structure de la table `ask`
--

CREATE TABLE `ask` (
  `id` int(11) NOT NULL,
  `fromProfileId` int(11) NOT NULL,
  `toProfileId` int(11) NOT NULL,
  `accepted` tinyint(1) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `conversation`
--

CREATE TABLE `conversation` (
  `id` int(11) NOT NULL,
  `title` int(11) NOT NULL,
  `created_at` int(11) NOT NULL,
  `updated_at` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `profile`
--

CREATE TABLE `profile` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `pseudo` varchar(50) DEFAULT NULL,
  `gender` varchar(10) NOT NULL,
  `forGender` varchar(10) NOT NULL,
  `city` varchar(30) DEFAULT NULL,
  `birthDate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `headline` varchar(255) DEFAULT NULL,
  `content` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `profile_photo`
--

CREATE TABLE `profile_photo` (
  `id` int(11) NOT NULL,
  `profileId` int(11) NOT NULL,
  `url` varchar(40) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `role`
--

CREATE TABLE `role` (
  `id` int(11) NOT NULL,
  `ref` varchar(30) NOT NULL,
  `level` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `scope`
--

CREATE TABLE `scope` (
  `id` int(11) NOT NULL,
  `ref` varchar(30) NOT NULL,
  `dyn` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `roleId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `user_scope`
--

CREATE TABLE `user_scope` (
  `userId` int(11) NOT NULL,
  `scopeId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `ask`
--
ALTER TABLE `ask`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fromProfileId` (`fromProfileId`),
  ADD KEY `toProfileId` (`toProfileId`);

--
-- Index pour la table `conversation`
--
ALTER TABLE `conversation`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `profile`
--
ALTER TABLE `profile`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `userId_2` (`userId`),
  ADD KEY `gender` (`gender`),
  ADD KEY `userId` (`userId`);

--
-- Index pour la table `profile_photo`
--
ALTER TABLE `profile_photo`
  ADD PRIMARY KEY (`id`),
  ADD KEY `profileId` (`profileId`);

--
-- Index pour la table `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `ref` (`ref`);

--
-- Index pour la table `scope`
--
ALTER TABLE `scope`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `ref` (`ref`);

--
-- Index pour la table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `roleId` (`roleId`);

--
-- Index pour la table `user_scope`
--
ALTER TABLE `user_scope`
  ADD PRIMARY KEY (`userId`,`scopeId`),
  ADD KEY `user_scope_ibfk_2` (`scopeId`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `ask`
--
ALTER TABLE `ask`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `conversation`
--
ALTER TABLE `conversation`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `profile`
--
ALTER TABLE `profile`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `profile_photo`
--
ALTER TABLE `profile_photo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `role`
--
ALTER TABLE `role`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `scope`
--
ALTER TABLE `scope`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `ask`
--
ALTER TABLE `ask`
  ADD CONSTRAINT `ask_ibfk_1` FOREIGN KEY (`fromProfileId`) REFERENCES `profile` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `ask_ibfk_2` FOREIGN KEY (`toProfileId`) REFERENCES `profile` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `profile`
--
ALTER TABLE `profile`
  ADD CONSTRAINT `profile_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `profile_photo`
--
ALTER TABLE `profile_photo`
  ADD CONSTRAINT `profile_photo_ibfk_1` FOREIGN KEY (`profileId`) REFERENCES `profile` (`id`);

--
-- Contraintes pour la table `user_scope`
--
ALTER TABLE `user_scope`
  ADD CONSTRAINT `user_scope_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `user_scope_ibfk_2` FOREIGN KEY (`scopeId`) REFERENCES `scope` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
